import { Pool } from 'pg'

let pool: Pool | null = null

const getPool = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
      process.exit(-1)
    })
  }
  return pool
}

export async function query(text: string, params?: any[]) {
  const client = await getPool().connect()
  try {
    const res = await client.query(text, params)
    return res
  } finally {
    client.release()
  }
}

export async function initializeDatabase() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS quiz_sessions (
        session_id VARCHAR(255) PRIMARY KEY,
        age_range VARCHAR(50),
        city VARCHAR(255),
        school VARCHAR(255),
        company VARCHAR(255),
        industry VARCHAR(255),
        experience_level VARCHAR(50),
        first_name VARCHAR(255),
        email VARCHAR(255),
        amount DECIMAL(10, 2),
        payment_status VARCHAR(50) DEFAULT 'pending',
        stripe_checkout_session_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log('Database table "quiz_sessions" ensured to exist.')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

interface QuizData {
  ageRange?: string
  city?: string
  school?: string
  company?: string
  industry?: string
  experienceLevel?: string
  firstName?: string
}

export async function storeQuizData(sessionId: string, data: QuizData) {
  try {
    await query(
      `INSERT INTO quiz_sessions (
        session_id, age_range, city, school, company, industry, experience_level, first_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (session_id) DO UPDATE SET
        age_range = EXCLUDED.age_range,
        city = EXCLUDED.city,
        school = EXCLUDED.school,
        company = EXCLUDED.company,
        industry = EXCLUDED.industry,
        experience_level = EXCLUDED.experience_level,
        first_name = EXCLUDED.first_name,
        updated_at = CURRENT_TIMESTAMP;
      `,
      [
        sessionId,
        data.ageRange,
        data.city,
        data.school,
        data.company,
        data.industry,
        data.experienceLevel,
        data.firstName,
      ]
    )
  } catch (error) {
    console.error('Error storing quiz data:', error)
    throw error
  }
}

interface PaymentInfo {
  email: string
  amount: number
  stripeCheckoutSessionId: string
}

export async function updatePaymentInfo(sessionId: string, info: PaymentInfo) {
  try {
    await query(
      `UPDATE quiz_sessions
      SET
        email = $1,
        amount = $2,
        payment_status = 'completed',
        stripe_checkout_session_id = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE session_id = $4;
      `,
      [info.email, info.amount, info.stripeCheckoutSessionId, sessionId]
    )
  } catch (error) {
    console.error('Error updating payment info:', error)
    throw error
  }
}

export async function getQuizData(sessionId: string) {
  try {
    const result = await query(
      `SELECT 
        age_range,
        city,
        school,
        company,
        industry,
        experience_level,
        first_name
      FROM quiz_sessions
      WHERE session_id = $1;
      `,
      [sessionId]
    )
    
    if (result.rows.length === 0) {
      return null
    }
    
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching quiz data:', error)
    throw error
  }
}
