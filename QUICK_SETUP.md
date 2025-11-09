# Quick Setup Guide

## ⚠️ IMPORTANT: Stripe Secret Key Issue

Your Stripe secret key appears to be incorrect. You provided a key starting with `pk_live_`, but **secret keys must start with `sk_live_` or `sk_test_`**.

### To Fix This:

1. Go to [Stripe Dashboard > Developers > API keys](https://dashboard.stripe.com/apikeys)
2. Find the **Secret key** section (not the Publishable key)
3. Click "Reveal live key" to see your actual secret key
4. Copy the key that starts with `sk_live_` (it will be much longer)

## Environment Variables Setup

Create a file named `.env.local` in the `frontend` directory:

```env
# Stripe Configuration
# Get your keys from: https://dashboard.stripe.com/apikeys
# ⚠️ Replace placeholders with your actual keys
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# For production: https://yourdomain.com

# Database (PostgreSQL on Render)
# Get your database URL from Render dashboard
# Use external URL for local development:
DATABASE_URL=postgresql://username:password@host:port/database_name

# For Render deployments, use internal URL (without .oregon-postgres.render.com):
# DATABASE_URL=postgresql://username:password@host/database_name
```

## Steps to Complete Setup

1. **Get your Stripe Secret Key:**
   - Visit https://dashboard.stripe.com/apikeys
   - Click "Reveal live key" next to the Secret key
   - Copy the key (it starts with `sk_live_`)

2. **Create `.env.local` file:**
   ```bash
   cd frontend
   # Create the file and paste the environment variables above
   ```

3. **Install Stripe (if not already installed):**
   ```bash
   npm install stripe
   ```

4. **Restart your development server:**
   ```bash
   npm run dev
   ```

## Verification

After setup, test the payment flow:
1. Complete the quiz
2. Go to result page
3. Select a payment amount
4. Click "Continue"
5. You should be redirected to Stripe Checkout (not mock mode)

If you see "mock mode" messages, check:
- ✅ Secret key starts with `sk_live_` or `sk_test_`
- ✅ Key is correct and active in Stripe dashboard
- ✅ Server was restarted after adding the key
- ✅ `.env.local` file is in the `frontend` directory

## Security Reminders

- ⚠️ Never commit `.env.local` to git (it's already in `.gitignore`)
- 🔒 Keep your secret keys secure
- 🧪 Use test keys for development
- 🚀 Use live keys only in production

