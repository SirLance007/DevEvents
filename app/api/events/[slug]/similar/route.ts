import { NextRequest, NextResponse } from 'next/server'
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions'

interface RouteParams {
  params: {
    slug: string
  }
}

/**
 * GET /api/events/[slug]/similar
 * Fetches similar events for a given event slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { slug } = params
    
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid slug parameter',
          message: 'Slug must be a non-empty string'
        },
        { status: 400 }
      )
    }

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

    // Get similar events
    const similarEvents = await getSimilarEventsBySlug(sanitizedSlug)

    return NextResponse.json(
      {
        message: 'Similar events fetched successfully',
        events: similarEvents,
        count: similarEvents.length
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error fetching similar events:', error)

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred while fetching similar events'
      },
      { status: 500 }
    )
  }
}