import mongoose, { Document, Schema } from 'mongoose'

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string
  slug: string
  description: string
  overview: string
  image: string
  venue: string
  location: string
  date: string
  time: string
  mode: string
  audience: string
  agenda: string[]
  organizer: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

// Event schema definition
const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  overview: {
    type: String,
    required: [true, 'Overview is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  mode: {
    type: String,
    required: [true, 'Mode is required'],
    enum: ['online', 'offline', 'hybrid'],
    lowercase: true
  },
  audience: {
    type: String,
    required: [true, 'Audience is required'],
    trim: true
  },
  agenda: {
    type: [String],
    required: [true, 'Agenda is required'],
    validate: {
      validator: (v: string[]) => v.length > 0,
      message: 'Agenda must have at least one item'
    }
  },
  organizer: {
    type: String,
    required: [true, 'Organizer is required'],
    trim: true
  },
  tags: {
    type: [String],
    required: [true, 'Tags are required'],
    validate: {
      validator: (v: string[]) => v.length > 0,
      message: 'At least one tag is required'
    }
  }
}, {
  timestamps: true // Auto-generates createdAt and updatedAt
})

// Pre-save hook for slug generation and data normalization
EventSchema.pre('save', function() {
  const doc = this as IEvent
  
  // Generate slug only if title is new or modified
  if (doc.isNew || doc.isModified('title')) {
    doc.slug = doc.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
  }

  // Normalize date to ISO format if it's a valid date
  if (doc.isModified('date')) {
    const parsedDate = new Date(doc.date)
    if (!isNaN(parsedDate.getTime())) {
      doc.date = parsedDate.toISOString().split('T')[0] // YYYY-MM-DD format
    }
  }

  // Normalize time format (ensure HH:MM format)
  if (doc.isModified('time')) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(doc.time)) {
      // Try to parse and format time
      const timeParts = doc.time.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/i)
      if (timeParts) {
        let hours = parseInt(timeParts[1])
        const minutes = timeParts[2] ? parseInt(timeParts[2]) : 0
        const period = timeParts[3]?.toLowerCase()

        if (period === 'pm' && hours !== 12) hours += 12
        if (period === 'am' && hours === 12) hours = 0

        doc.time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      }
    }
  }
})

// Create and export the Event model
const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema)
export default Event