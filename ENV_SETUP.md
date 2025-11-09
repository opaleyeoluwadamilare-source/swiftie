# Environment Variables Setup

## Important: Stripe Secret Key Format

⚠️ **Your Stripe secret key must start with `sk_live_` or `sk_test_`**

The key you provided starts with `pk_live_` which is a **publishable key**, not a secret key.

### To get your correct Stripe secret key:

1. Go to [Stripe Dashboard > Developers > API keys](https://dashboard.stripe.com/apikeys)
2. Find the **Secret key** (it will start with `sk_live_` for live mode or `sk_test_` for test mode)
3. Click "Reveal test key" or "Reveal live key" to see the full key
4. Copy the **Secret key** (NOT the publishable key)

## Environment Variables

Create a `.env.local` file in the `frontend` directory with the following:

```env
# Stripe Configuration
# Get your keys from: https://dashboard.stripe.com/apikeys
# ⚠️ Replace placeholders with your actual keys
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# For production, use: https://yourdomain.com

# Database Configuration (if using PostgreSQL)
# Get your database URL from Render dashboard
DATABASE_URL=postgresql://username:password@host:port/database_name
# Or use internal URL for Render deployments (without .oregon-postgres.render.com):
# DATABASE_URL=postgresql://username:password@host/database_name

# Stripe Webhook Secret (for production webhooks)
# Get this from Stripe Dashboard > Developers > Webhooks
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Security Notes

- ⚠️ **NEVER commit `.env.local` to version control**
- The `.env.local` file is already in `.gitignore`
- Use test keys (`sk_test_` and `pk_test_`) for development
- Use live keys (`sk_live_` and `pk_live_`) only in production
- Keep your secret keys secure and rotate them if compromised

## Verification

After setting up your environment variables:

1. Restart your development server: `npm run dev`
2. Try making a payment - if the Stripe key is correct, you'll be redirected to Stripe Checkout
3. If you see "mock mode" messages, check that:
   - Your secret key starts with `sk_live_` or `sk_test_`
   - The key is correct and active in your Stripe dashboard
   - You've restarted the server after adding the key

