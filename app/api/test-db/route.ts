import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'

export async function GET() {
  try {
    await dbConnect()
    return NextResponse.json({ 
      message: 'MongoDB connected successfully!',
      status: 'success' 
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return NextResponse.json({ 
      message: 'Failed to connect to MongoDB',
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'error' 
    }, { status: 500 })
  }
}