# Vercel Deployment - Environment Variables Setup

## Quick Setup Guide

### Step 1: Get Your API Keys

1. **Stripe Keys:**
   - Go to https://dashboard.stripe.com/apikeys
   - Copy your **Secret key** (starts with `sk_live_`)
   - Copy your **Publishable key** (starts with `pk_live_`)

2. **Database URL:**
   - Go to Render Dashboard → Your PostgreSQL Database
   - Copy the **External Connection String**
   - It should look like: `postgresql://user:pass@host.oregon-postgres.render.com/dbname`

3. **Webhook Secret:**
   - Set up webhook first (see Step 2)
   - Then get the secret from Stripe Dashboard → Developers → Webhooks

### Step 2: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable below (replace placeholders with your actual values):

```
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
STRIPE_SECRET_KEY=sk_live_your_actual_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
DATABASE_URL=postgresql://your_actual_database_url
```

4. **Important:** Select all environments (Production, Preview, Development)
5. Click **Save**

### Step 3: Deploy

1. Push your code to GitHub (if not already done)
2. Vercel will automatically deploy
3. Wait for deployment to complete

### Step 4: Update Base URL

After first deployment:

1. Copy your Vercel URL (e.g., `https://your-app-name.vercel.app`)
2. Go back to Environment Variables
3. Update `NEXT_PUBLIC_BASE_URL` with your actual URL
4. Redeploy (or it will auto-deploy)

### Step 5: Set Up Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **Add endpoint**
3. Enter: `https://your-app-name.vercel.app/api/webhook/stripe`
4. Select event: `checkout.session.completed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`
7. Redeploy

## Environment Variables Reference

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `NODE_ENV` | Always `production` | - |
| `NEXT_PUBLIC_BASE_URL` | Your Vercel app URL | After first deployment |
| `STRIPE_SECRET_KEY` | Stripe secret key | Stripe Dashboard → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Stripe Dashboard → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Stripe Dashboard → Webhooks |
| `DATABASE_URL` | PostgreSQL connection string | Render Dashboard → Database |

## Quick Copy Template

See `VERCEL_ENV_QUICK_COPY.txt` for a clean template you can copy and fill in.

## Troubleshooting

**Build fails?**
- Check that all environment variables are set
- Verify variable names match exactly (case-sensitive)
- Check build logs in Vercel dashboard

**Database connection fails?**
- Use the **external URL** (with `.oregon-postgres.render.com`) for Vercel
- Verify database is running in Render dashboard
- Check that credentials are correct

**Stripe not working?**
- Verify keys start with `sk_live_` and `pk_live_`
- Check that keys are active in Stripe dashboard
- Ensure webhook is set up correctly

**Webhook not receiving events?**
- Verify webhook URL is correct
- Check webhook secret matches in Vercel
- View webhook logs in Stripe dashboard

