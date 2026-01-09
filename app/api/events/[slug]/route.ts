import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Event, IEvent } from '@/database'

// Type for route parameters
interface RouteParams {
  params: {
    slug: string
  }
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Validate slug parameter
    // console.log(params);
    const { slug } = await params;
    
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid slug parameter',
          message: 'Slug must be a non-empty string'
        },
        { status: 400 }
      )
    }

    // Sanitize slug - remove any potentially harmful characters
    const sanitizedSlug = slug.trim().toLowerCase()
    
    if (sanitizedSlug.length === 0) {
      return NextResponse.json(
        { 
          error: 'Invalid slug parameter',
          message: 'Slug cannot be empty'
        },
        { status: 400 }
      )
    }

    // Connect to database
    await dbConnect()

    // Query event by slug with proper error handling
    const event: IEvent | null = await Event.findOne({ 
      slug: sanitizedSlug 
    }).lean() // Use lean() for better performance as we don't need mongoose document methods

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { 
          error: 'Event not found',
          message: `No event found with slug: ${sanitizedSlug}`
        },
        { status: 404 }
      )
    }

    // Return successful response with event data (matching existing API format)
    return NextResponse.json(
      {
        message: 'Event fetched successfully',
        event
      },
      { status: 200 }
    )

  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('Error fetching event by slug:', error)

    // Handle specific MongoDB/Mongoose errors
    if (error instanceof Error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { 
            error: 'Validation error',
            message: error.message
          },
          { status: 400 }
        )
      }

      // Handle cast errors (invalid ObjectId format, etc.)
      if (error.name === 'CastError') {
        return NextResponse.json(
          { 
            error: 'Invalid parameter format',
            message: 'The provided slug format is invalid'
          },
          { status: 400 }
        )
      }
    }

    // Generic server error for unexpected issues
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred while fetching the event'
      },
      { status: 500 }
    )
  }
}