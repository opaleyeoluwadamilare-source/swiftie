# Local Testing Guide

## ✅ Safe Local Testing

**Good news:** Testing locally is completely safe! Your changes won't affect Git or Vercel until you explicitly commit and push them.

## 🚀 Quick Start

### 1. Start the Development Server

From the `frontend` directory, run:

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

### 2. Test Your Changes

- Open http://localhost:3000 in your browser
- Make changes to files
- The page will auto-reload with your changes (hot reload)
- Test the quiz flow and result page to see the connection nodes

### 3. Check What Changed (Before Committing)

To see which files you've modified:

```bash
git status
```

This shows:
- **Modified files** (files you changed)
- **Untracked files** (new files not yet in git)
- **Staged files** (files ready to commit)

### 4. When You're Ready to Deploy

Only when you're happy with your local changes:

```bash
# 1. Check what changed
git status

# 2. Add the files you want to commit
git add .

# 3. Commit with a message
git commit -m "Fix connection node calculation and display logic"

# 4. Push to GitHub (this triggers Vercel auto-deploy)
git push
```

## 🔒 What's Protected

Your `.gitignore` file protects:
- ✅ `.env.local` - Your local environment variables (database, API keys)
- ✅ `node_modules/` - Dependencies
- ✅ `.next/` - Build files
- ✅ `.vercel/` - Vercel config

**These will NEVER be committed to Git, so your local config stays local!**

## 🎯 Workflow Summary

1. **Make changes** → Edit files locally
2. **Test locally** → `npm run dev` and test in browser
3. **Check changes** → `git status` to see what changed
4. **Commit when ready** → `git add .` → `git commit -m "message"` → `git push`
5. **Vercel auto-deploys** → Your changes go live automatically

## 💡 Tips

- **Don't commit until you're ready** - Local changes are safe and won't affect production
- **Test thoroughly locally** - Catch issues before they go to production
- **Use descriptive commit messages** - Helps track what changed
- **Check `git status` often** - See what you're about to commit

## 🐛 Troubleshooting

If the dev server won't start:
```bash
# Make sure you're in the frontend directory
cd frontend

# Install dependencies if needed
npm install

# Start dev server
npm run dev
```

If you see database connection errors locally:
- That's normal! Your local `.env.local` might have different database settings
- The connection node logic will still work (it calculates based on quiz inputs)
- You can test the visual path without a database connection

