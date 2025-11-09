import { NextRequest, NextResponse } from 'next/server'
import { storeQuizData, initializeDatabase } from '@/lib/db'

// Initialize database on first import
let dbInitialized = false

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      try {
        await initializeDatabase()
        dbInitialized = true
      } catch (error) {
        console.error('Database initialization error:', error)
        // Continue even if DB init fails (for development)
      }
    }

    const body = await request.json()
    const requiredFields = ['ageRange', 'city', 'school', 'industry', 'experienceLevel']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Store quiz data in database
    try {
      await storeQuizData(sessionId, {
        ageRange: body.ageRange,
        city: body.city,
        school: body.school,
        company: body.company,
        industry: body.industry,
        experienceLevel: body.experienceLevel,
        firstName: body.firstName,
      })
      console.log(`Quiz data stored for session: ${sessionId}`)
    } catch (dbError) {
      console.error('Error storing quiz data:', dbError)
      // Continue even if DB storage fails (for development)
    }

    return NextResponse.json({ 
      sessionId,
      message: 'Search initiated successfully'
    })
  } catch (error) {
    console.error('Error processing search request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}