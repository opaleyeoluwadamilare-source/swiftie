# Apple Pay & Google Pay Setup Guide

## Why They Might Not Be Showing

Even though Apple Pay and Google Pay are enabled in your Stripe Dashboard, they may not appear due to several requirements:

### 1. **Device & Browser Requirements**

**Apple Pay:**
- ✅ Only works on **Safari** browser
- ✅ Only on **Apple devices** (iPhone, iPad, Mac)
- ❌ Won't show on Chrome, Firefox, or Windows devices
- ❌ Won't show on Android devices

**Google Pay:**
- ✅ Works on **Chrome** browser
- ✅ Works on Android devices and desktop Chrome
- ❌ Won't show on Safari or Firefox

### 2. **HTTPS Requirement**

- ✅ **Production**: Must use HTTPS (not HTTP)
- ⚠️ **Localhost**: May not work on `http://localhost:3000`
- 💡 **Solution for testing**: Use [ngrok](https://ngrok.com/) to create an HTTPS tunnel:
  ```bash
  ngrok http 3000
  ```
  Then use the ngrok URL (e.g., `https://abc123.ngrok.io`) to test

### 3. **Domain Verification (Apple Pay)**

For Apple Pay to work in production:
1. Go to [Stripe Dashboard > Settings > Payment methods > Apple Pay](https://dashboard.stripe.com/settings/payment_methods)
2. Add your domain (e.g., `yourdomain.com`)
3. Download the domain verification file
4. Upload it to your website's root directory (e.g., `/.well-known/apple-developer-merchantid-domain-association`)
5. Verify the domain in Stripe Dashboard

### 4. **Browser Settings**

**Chrome (for Google Pay):**
- Go to Settings > Autofill and passwords > Payment methods
- Enable "Allow sites to check if you have payment methods saved"

**Safari (for Apple Pay):**
- Go to Settings > Wallet & Apple Pay
- Ensure Apple Pay is set up with at least one card

### 5. **Testing Checklist**

✅ **To see Apple Pay:**
- Use Safari browser
- On iPhone, iPad, or Mac
- Have Apple Pay set up with a card
- Use HTTPS (or ngrok for local testing)

✅ **To see Google Pay:**
- Use Chrome browser
- Have Google Pay set up with a card
- Use HTTPS (or ngrok for local testing)

### 6. **Quick Test**

1. **For Apple Pay:**
   - Open Safari on iPhone/Mac
   - Visit your checkout page
   - Apple Pay button should appear at the top

2. **For Google Pay:**
   - Open Chrome on Android/Desktop
   - Visit your checkout page
   - Google Pay button should appear at the top

### 7. **If Still Not Showing**

1. **Check Stripe Dashboard:**
   - Settings > Payment methods
   - Ensure Apple Pay and Google Pay are toggled ON
   - For Apple Pay, verify your domain is added and verified

2. **Check Console:**
   - Open browser DevTools (F12)
   - Look for any errors related to payment methods

3. **Test with Stripe Test Mode:**
   - Use test cards in your Stripe Dashboard
   - Test mode should work the same way

4. **Verify Your Integration:**
   - The code is correctly configured
   - Payment method type includes 'card'
   - Checkout session is being created successfully

### 8. **Production Deployment**

When deploying to production:
- ✅ Use HTTPS (required)
- ✅ Verify domain in Stripe Dashboard (for Apple Pay)
- ✅ Test on actual devices (iPhone for Apple Pay, Android for Google Pay)
- ✅ Ensure payment methods are enabled in Stripe Dashboard

## Current Configuration

The checkout session is configured with:
- `payment_method_types: ['card']` - This enables Apple Pay and Google Pay automatically
- Payment methods enabled in Stripe Dashboard
- Proper success/cancel URLs

The payment buttons will appear automatically when all requirements are met!


