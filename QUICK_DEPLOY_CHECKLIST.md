# Quick Deploy Checklist ✅

## Before You Start

- [ ] Install Git: https://git-scm.com/download/win
- [ ] Create GitHub account: https://github.com/signup
- [ ] Create Render account: https://render.com

## Step-by-Step Deployment

### 1. Setup Git (One-time setup)

```powershell
# Open PowerShell in frontend folder
cd "C:\Users\OPAkg\Downloads\Taylorcode-main (1)\Taylorcode-main\frontend"

# Initialize git
git init
git add .
git commit -m "Initial commit"
```

### 2. Push to GitHub

```powershell
# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3. Deploy on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub → Select your repo
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Root Directory:** `frontend` (or leave blank if repo root is frontend)
5. Add environment variables (see RENDER_DEPLOYMENT.md)
6. Click "Create Web Service"

### 4. After First Deployment

- [ ] Copy your Render URL
- [ ] Update `NEXT_PUBLIC_BASE_URL` in Render env vars
- [ ] Set up Stripe webhook with your Render URL
- [ ] Add `STRIPE_WEBHOOK_SECRET` to Render env vars
- [ ] Test the app!

## Environment Variables Needed

Copy these to Render dashboard:

```
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-app.onrender.com

# Stripe - Get your keys from: https://dashboard.stripe.com/apikeys
# ⚠️ Replace placeholders with your actual keys
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here

# Database - Get your database URL from Render dashboard
# Use internal URL for Render deployments (without .oregon-postgres.render.com):
DATABASE_URL=postgresql://username:password@host/database_name

# Stripe Webhook Secret - Get from Stripe Dashboard after setting up webhook
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Common Issues

**Git not found?** → Install from https://git-scm.com/download/win

**Build fails?** → Check build logs in Render dashboard

**Database error?** → Use internal URL (without .oregon-postgres.render.com) for Render

**Webhook not working?** → Verify URL and secret in Stripe Dashboard

## Need Help?

See full guide: `RENDER_DEPLOYMENT.md`

