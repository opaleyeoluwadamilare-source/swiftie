# Security Notes - API Keys

## ⚠️ IMPORTANT: Never Commit Real API Keys

This repository uses **placeholders** for API keys in all documentation files. 

## Where to Store Your Real API Keys

### For Local Development:
Create a `.env.local` file in the `frontend` directory (this file is already in `.gitignore`):

```env
STRIPE_SECRET_KEY=sk_live_your_actual_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_key_here
DATABASE_URL=postgresql://your_actual_database_url_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here
```

### For Production (Render):
Add your real API keys as **Environment Variables** in the Render dashboard:
1. Go to your Render service
2. Click "Environment"
3. Add each variable with your actual values

## Files That Use Placeholders

All documentation files use placeholders:
- `env.local.template` - Template file (copy to `.env.local` and fill in real keys)
- `ENV_SETUP.md` - Setup instructions
- `QUICK_SETUP.md` - Quick setup guide
- `RENDER_DEPLOYMENT.md` - Deployment guide
- `QUICK_DEPLOY_CHECKLIST.md` - Deployment checklist

## What's Protected

The following files are in `.gitignore` and will **never** be committed:
- `.env`
- `.env.local`
- `.env*.local`

## If You Accidentally Committed Keys

If you've already committed real API keys to git:

1. **Immediately rotate your keys** in Stripe/Render dashboards
2. **Remove the keys from git history** (contact support if needed)
3. **Replace with placeholders** in all files
4. **Force push** the cleaned version

## Getting Your API Keys

- **Stripe Keys:** https://dashboard.stripe.com/apikeys
- **Database URL:** Render Dashboard → Your Database → Connection String
- **Webhook Secret:** Stripe Dashboard → Developers → Webhooks → Your Webhook → Signing Secret


