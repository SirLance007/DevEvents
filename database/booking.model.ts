import mongoose, { Document, Schema } from 'mongoose'
import Event from './event.model'

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId
  email: string
  createdAt: Date
  updatedAt: Date
}

// Booking schema definition
const BookingSchema = new Schema<IBooking>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required'],
    index: true // Index for faster queries
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email: string) {
        // Email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      },
      message: 'Please provide a valid email address'
    }
  }
}, {
  timestamps: true // Auto-generates createdAt and updatedAt
})

// Pre-save hook to validate event existence
BookingSchema.pre('save', async function() {
  try {
    const doc = this as IBooking
    
    // Only validate eventId if it's new or modified
    if (doc.isNew || doc.isModified('eventId')) {
      const eventExists = await Event.findById(doc.eventId)
      
      if (!eventExists) {
        throw new Error('Referenced event does not exist')
      }
    }
  } catch (error) {
    throw error
  }
})

// Create and export the Booking model
const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
export default Booking