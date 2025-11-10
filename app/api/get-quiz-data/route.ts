import { NextRequest, NextResponse } from 'next/server'
import { getQuizData } from '@/lib/db'

// Force dynamic rendering since we use searchParams
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }
    
    const quizData = await getQuizData(sessionId)
    
    if (!quizData) {
      return NextResponse.json(
        { error: 'Quiz data not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(quizData)
  } catch (error) {
    console.error('Error fetching quiz data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz data' },
      { status: 500 }
    )
  }
}

