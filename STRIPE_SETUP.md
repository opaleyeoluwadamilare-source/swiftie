# Stripe Payment Integration Setup

This app uses Stripe for "Pay What You Like" payments with a minimum of $13.

## Quick Setup

### 1. Install Stripe

```bash
npm install stripe
```

### 2. Get Your Stripe Keys

1. Sign up at [https://stripe.com](https://stripe.com)
2. Go to [Dashboard > Developers > API keys](https://dashboard.stripe.com/apikeys)
3. Copy your **Publishable key** and **Secret key**

### 3. Configure Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, use your live keys (starting with `sk_live_` and `pk_live_`).

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Complete the quiz and go to the result page
3. Select a payment amount ($13, $20, $50, or custom)
4. Click "Continue" - you'll be redirected to Stripe Checkout

### 5. Webhook Setup (Optional but Recommended)

To handle payment events securely:

1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login: `stripe login`
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
4. Copy the webhook signing secret and add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

For production, configure the webhook endpoint in your Stripe Dashboard:
- URL: `https://yourdomain.com/api/webhook/stripe`
- Events: `checkout.session.completed`, `payment_intent.succeeded`

## Payment Flow

1. User selects amount ($13 minimum) or enters custom amount
2. Clicks "Continue" button
3. Frontend calls `/api/create-checkout` with amount and sessionId
4. API creates Stripe Checkout Session with dynamic pricing
5. User is redirected to Stripe Checkout
6. After payment, user is redirected back to result page with `payment=success`
7. Result page automatically unlocks the full connection story

## Current Implementation

- ✅ Variable payment amounts (minimum $13)
- ✅ Preset buttons ($13, $20, $50)
- ✅ Custom amount input
- ✅ Stripe Checkout integration
- ✅ Payment success/cancellation handling
- ✅ Webhook handler (ready for implementation)

## Mock Mode

If Stripe keys are not configured, the app runs in "mock mode":
- Payment flow works without actual Stripe integration
- Useful for development and testing UI
- Automatically unlocks content after clicking Continue

## Security Notes

- Never commit `.env.local` to version control
- Always use HTTPS in production
- Validate webhook signatures in production
- Store payment status in your database
- Use Stripe's test mode for development


