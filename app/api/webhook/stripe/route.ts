import { NextRequest, NextResponse } from 'next/server'
import { updatePaymentInfo, initializeDatabase } from '@/lib/db'

// Stripe webhook handler for payment events
// To use this, configure your Stripe webhook endpoint to point to:
// https://yourdomain.com/api/webhook/stripe
// And set STRIPE_WEBHOOK_SECRET in your environment variables

// Initialize database on first import
let dbInitialized = false

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      try {
        await initializeDatabase()
        dbInitialized = true
      } catch (error) {
        console.error('Database initialization error:', error)
        // Continue even if DB init fails (for development)
      }
    }

    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event
    try {
      // Verify webhook signature
      if (webhookSecret && webhookSecret.startsWith('whsec_')) {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      } else {
        // For development/testing without webhook secret
        console.warn('No valid webhook secret found, parsing event without verification')
        event = JSON.parse(body)
      }
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      // For development, try to parse the body anyway
      try {
        event = JSON.parse(body)
        console.log('Parsed event without verification (development mode)')
      } catch (parseError) {
        return NextResponse.json(
          { error: 'Webhook signature verification failed' },
          { status: 400 }
        )
      }
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        const sessionId = session.metadata?.sessionId
        const customerEmail = session.customer_details?.email || session.customer_email
        const amount = session.amount_total ? session.amount_total / 100 : 0

        if (sessionId && customerEmail) {
          try {
            // Update database with payment information
            await updatePaymentInfo(sessionId, {
              email: customerEmail,
              amount: amount,
              stripeCheckoutSessionId: session.id,
            })
            console.log(`✅ Payment completed and saved for session: ${sessionId}, email: ${customerEmail}, amount: $${amount}`)
          } catch (dbError) {
            console.error('Error updating payment info in database:', dbError)
            // Don't fail the webhook, just log the error
          }
        } else {
          console.warn('Missing sessionId or email in checkout session:', {
            sessionId,
            customerEmail,
            stripeSessionId: session.id,
          })
        }
        break
      
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('PaymentIntent succeeded:', paymentIntent.id)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

