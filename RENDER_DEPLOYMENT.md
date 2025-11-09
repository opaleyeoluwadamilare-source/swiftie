# Render Deployment Guide

## Prerequisites

1. **GitHub Account** - You'll need a GitHub account
2. **Git Installed** - Install Git from https://git-scm.com/download/win
3. **Render Account** - Sign up at https://render.com

## Step 1: Install Git (if not installed)

1. Download Git for Windows: https://git-scm.com/download/win
2. Install with default settings
3. Restart your terminal/PowerShell after installation

## Step 2: Initialize Git Repository

Open PowerShell in the `frontend` directory and run:

```powershell
# Navigate to frontend directory
cd "C:\Users\OPAkg\Downloads\Taylorcode-main (1)\Taylorcode-main\frontend"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Taylor Connect app"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `taylor-connect`)
3. **DO NOT** initialize with README, .gitignore, or license
4. Copy the repository URL (e.g., `https://github.com/yourusername/taylor-connect.git`)

## Step 4: Push to GitHub

```powershell
# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/taylor-connect.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Deploy to Render

### 5.1 Create New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository (`taylor-connect`)

### 5.2 Configure Build Settings

**Name:** `taylor-connect` (or your preferred name)

**Environment:** `Node`

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Root Directory:** `frontend` (if your repo root is the parent folder, otherwise leave blank)

### 5.3 Environment Variables

Add these environment variables in Render dashboard:

```
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-app-name.onrender.com

# Stripe
# Get your keys from: https://dashboard.stripe.com/apikeys
# ⚠️ Replace placeholders with your actual keys
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here

# Database (PostgreSQL)
# Get your database URL from Render dashboard
# Use internal URL for Render deployments (without .oregon-postgres.render.com):
DATABASE_URL=postgresql://username:password@host/database_name

# Stripe Webhook Secret (get from Stripe Dashboard after setting up webhook)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Important Notes:**
- Replace `your-app-name.onrender.com` with your actual Render URL after first deployment
- For `DATABASE_URL`, use the **internal URL** (without `.oregon-postgres.render.com`) if your database is on Render
- Get `STRIPE_WEBHOOK_SECRET` from Stripe Dashboard after setting up webhook

### 5.4 Advanced Settings

- **Auto-Deploy:** Yes (deploys automatically on every push to main)
- **Plan:** Free tier is fine to start

### 5.5 Deploy

Click **"Create Web Service"** and wait for deployment (5-10 minutes)

## Step 6: Configure Stripe Webhook

After deployment:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **"Add endpoint"**
3. Enter your Render URL: `https://your-app-name.onrender.com/api/webhook/stripe`
4. Select event: `checkout.session.completed`
5. Copy the webhook signing secret
6. Add it to Render environment variables as `STRIPE_WEBHOOK_SECRET`
7. Redeploy your service (or it will auto-deploy)

## Step 7: Update Environment Variables

After first deployment, update `NEXT_PUBLIC_BASE_URL` with your actual Render URL:

```
NEXT_PUBLIC_BASE_URL=https://your-actual-app-name.onrender.com
```

## Troubleshooting

### Build Fails

- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version (Render uses Node 18+ by default)

### Database Connection Issues

- Use **internal URL** for `DATABASE_URL` if database is on Render
- Use **external URL** (with `.oregon-postgres.render.com`) for local development
- Check database is running and accessible

### Environment Variables Not Working

- Make sure variable names match exactly (case-sensitive)
- Redeploy after adding new variables
- Check for typos in variable values

### Webhook Not Working

- Verify webhook URL is correct
- Check webhook secret is set correctly
- View webhook logs in Stripe Dashboard

## Quick Commands Reference

```powershell
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# View git log
git log --oneline
```

## Next Steps After Deployment

1. ✅ Test the app on your Render URL
2. ✅ Complete a test quiz
3. ✅ Test payment flow (use Stripe test mode first)
4. ✅ Verify webhook is receiving events
5. ✅ Check database is storing data correctly

## Support

If you encounter issues:
- Check Render build logs
- Check Render service logs
- Verify all environment variables are set
- Ensure GitHub repository is public (or connect Render with proper permissions)

