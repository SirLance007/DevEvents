import dbConnect from '@/lib/mongodb'
import { Event } from '@/database'

export async function getSimilarEventsBySlug(currentSlug: string, limit: number = 3) {
  try {
    await dbConnect()
    
    // Get the current event to find similar ones based on tags
    const currentEvent = await Event.findOne({ slug: currentSlug }).lean()
    
    if (!currentEvent) {
      return []
    }

    // Parse tags safely
    let currentTags: string[] = []
    try {
      currentTags = Array.isArray(currentEvent.tags) 
        ? currentEvent.tags 
        : JSON.parse(currentEvent.tags[0] || '[]')
    } catch {
      currentTags = []
    }

    // Find similar events based on tags, excluding the current event
    const similarEvents = await Event.find({
      slug: { $ne: currentSlug }, // Exclude current event
      $or: [
        // Match events with similar tags
        { tags: { $in: currentTags } },
        // Match events with similar mode
        { mode: currentEvent.mode },
        // Match events with similar organizer
        { organizer: currentEvent.organizer }
      ]
    })
    .limit(limit)
    .lean()

    return similarEvents
  } catch (error) {
    console.error('Error fetching similar events:', error)
    return []
  }
}

export async function getAllEvents() {
  try {
    await dbConnect()
    
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .lean()
    
    return events
  } catch (error) {
    console.error('Error fetching all events:', error)
    return []
  }
}