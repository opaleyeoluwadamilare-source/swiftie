import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, sessionId } = body

    // Validate amount (minimum $13)
    const amountInCents = Math.round(parseFloat(amount) * 100)
    if (isNaN(amountInCents) || amountInCents < 1300) {
      return NextResponse.json(
        { error: 'Amount must be at least $13' },
        { status: 400 }
      )
    }

    // Stripe Integration
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    
    if (stripeSecretKey && stripeSecretKey.startsWith('sk_')) {
      // Real Stripe integration
      const stripe = require('stripe')(stripeSecretKey)
      
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        
        const checkoutSession = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Unlock Your Taylor Swift Connection Path',
                  description: 'Get the full story of how you connect to Taylor Swift',
                },
                unit_amount: amountInCents,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${baseUrl}/result?session=${sessionId}&payment=success`,
          cancel_url: `${baseUrl}/result?session=${sessionId}&payment=cancelled`,
          metadata: {
            sessionId: sessionId,
            amount: amount.toString(),
          },
          customer_email: undefined, // Let Stripe collect email during checkout
          // Payment method options for better UX
          payment_method_options: {
            card: {
              request_three_d_secure: 'automatic',
            },
          },
          // Apple Pay and Google Pay configuration
          // They are automatically enabled when:
          // 1. Payment method type includes 'card' (✓ done)
          // 2. Enabled in Stripe Dashboard (✓ user confirmed)
          // 3. Domain is verified in Stripe Dashboard (for Apple Pay)
          // 4. Customer is on supported device/browser:
          //    - Apple Pay: iOS Safari, macOS Safari
          //    - Google Pay: Chrome on Android/Desktop
          // 5. Site uses HTTPS (required for production)
          // Note: For localhost testing, they may not appear. Use ngrok or deploy to test.
        })

        return NextResponse.json({ 
          checkoutUrl: checkoutSession.url,
          sessionId: checkoutSession.id 
        })
      } catch (stripeError: any) {
        console.error('Stripe API error:', stripeError)
        // If Stripe key is invalid, fall back to mock mode
        if (stripeError.type === 'StripeAuthenticationError') {
          console.warn('Invalid Stripe key detected, falling back to mock mode')
          // Continue to mock mode below
        } else {
          throw stripeError
        }
      }
    } else if (stripeSecretKey && !stripeSecretKey.startsWith('sk_')) {
      console.warn('Stripe secret key format is incorrect. Secret keys should start with sk_live_ or sk_test_')
    }

    // Mock response for development (when Stripe is not configured)
    return NextResponse.json({ 
      checkoutUrl: `/result?session=${sessionId}&payment=success&amount=${amount}`,
      sessionId: `checkout_${Date.now()}`,
      message: 'Checkout session created (mock mode - configure Stripe for production)'
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

