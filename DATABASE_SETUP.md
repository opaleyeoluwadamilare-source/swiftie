# Database Setup Guide

## Overview

The application now stores all user quiz data and payment information in a PostgreSQL database on Render. When users complete the quiz and make a payment, all their information is automatically saved.

## Database Schema

The `quiz_sessions` table stores:

- **Session Information:**
  - `session_id` (unique identifier for each quiz session)
  - `created_at` (when the quiz was started)

- **Quiz Answers (7 questions):**
  - `age_range` (Question 1)
  - `city` (Question 2)
  - `school` (Question 3)
  - `company` (Question 4 - optional)
  - `industry` (Question 5)
  - `experience_level` (Question 6)
  - `first_name` (Question 7 - optional)

- **Payment Information:**
  - `payment_status` (pending/completed)
  - `payment_email` (email from Stripe Checkout)
  - `payment_amount` (amount paid)
  - `payment_completed_at` (timestamp of payment)
  - `stripe_checkout_session_id` (Stripe session ID)

## How It Works

### 1. Quiz Submission (`/api/search`)

When a user completes the quiz:
- All 7 question answers are stored in the database
- A unique `session_id` is generated
- Data is saved with `payment_status = 'pending'`

### 2. Payment Processing (Stripe Webhook)

When a user completes payment:
- Stripe sends a webhook to `/api/webhook/stripe`
- The webhook handler:
  - Retrieves the `session_id` from Stripe metadata
  - Gets the customer email from Stripe Checkout
  - Updates the database record with:
    - Payment email
    - Payment amount
    - Payment status = 'completed'
    - Payment timestamp
    - Stripe checkout session ID

## Database Connection

The database connection is configured via the `DATABASE_URL` environment variable:

```env
DATABASE_URL=postgresql://connections_user:password@host/database
```

- **For local development:** Use the external URL (with `.oregon-postgres.render.com`)
- **For Render deployments:** Use the internal URL (without `.oregon-postgres.render.com`)

## Automatic Table Creation

The database tables are automatically created on first use. The `initializeDatabase()` function:

1. Creates the `quiz_sessions` table if it doesn't exist
2. Creates indexes for faster lookups
3. Handles errors gracefully (won't break the app if DB is unavailable)

## Viewing Data

To view the stored data, you can:

1. **Connect to Render PostgreSQL:**
   - Go to your Render dashboard
   - Open your PostgreSQL database
   - Use the built-in SQL editor or connect via a PostgreSQL client

2. **Query all paid users:**
   ```sql
   SELECT * FROM quiz_sessions 
   WHERE payment_status = 'completed'
   ORDER BY payment_completed_at DESC;
   ```

3. **Get user count:**
   ```sql
   SELECT COUNT(*) FROM quiz_sessions 
   WHERE payment_status = 'completed';
   ```

4. **Get all quiz answers for a specific session:**
   ```sql
   SELECT * FROM quiz_sessions 
   WHERE session_id = 'session-xxxxx';
   ```

## Webhook Configuration

To enable payment tracking:

1. **In Stripe Dashboard:**
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhook/stripe`
   - Select events: `checkout.session.completed`
   - Copy the webhook signing secret

2. **Add to `.env.local`:**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

## Testing

### Local Testing

1. Make sure `DATABASE_URL` is set in `.env.local`
2. Complete a quiz - data should be stored
3. Complete a payment - webhook will update the record

### Webhook Testing

You can test webhooks locally using Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

Or use ngrok to expose your local server:

```bash
ngrok http 3000
# Then use the ngrok URL in Stripe webhook settings
```

## Error Handling

The system is designed to be resilient:

- If database is unavailable, the app continues to work
- Quiz data is stored even if payment hasn't been made yet
- Payment information is updated when webhook is received
- All errors are logged to console for debugging

## Security Notes

- ✅ Database credentials are stored in environment variables
- ✅ Webhook signatures are verified (when webhook secret is configured)
- ✅ All database queries use parameterized statements (SQL injection protection)
- ✅ SSL is enabled for Render PostgreSQL connections


