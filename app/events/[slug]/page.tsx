import { notFound } from 'next/navigation';
import Image from 'next/image';
import BookEvent from '@/components/BookEvent';
import EventCard from '@/components/EventCard';
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions';

// Type definitions
interface Event {
  _id: string
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
  createdAt: string
  updatedAt: string
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function getEvent(slug: string): Promise<Event | null> {
  try {
    // Use Vercel URL in production, localhost in development
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    const res = await fetch(
      `${baseUrl}/api/events/${slug}`,
      {
        cache: 'no-store' // Always fetch fresh data
      }
    )
    
    if (!res.ok) {
      if (res.status === 404) {
        return null
      }
      throw new Error('Failed to fetch event')
    }
    
    const data = await res.json()
    return data.event
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

const EventDeatilItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
    <div className='flex-row-gap-2 items-center'>
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

// agenda

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className='agenda'>
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className='flex flex-row gap-1.5 flex-wrap'>
        {tags.map((tag) => (
            <div className='pill' key={tag}>{tag}</div>
        ))}
    </div>
)

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;
    
    const event = await getEvent(slug);
    
    if (!event) {
        return notFound();
    }

    try {
async function getEvent(slug: string): Promise<Event | null> {
  try {
    // Use Vercel URL in production, localhost in development
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    const res = await fetch(
      `${baseUrl}/api/events/${slug}`,
      {
        cache: 'no-store' // Always fetch fresh data
      }
    )
    
    if (!res.ok) {
      if (res.status === 404) {
        return null
      }
      throw new Error('Failed to fetch event')
    }
    
    const data = await res.json()
    return data.event
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

        const { 
            title,
            description, 
            image, 
            overview, 
            date, 
            time, 
            location, 
            venue,
            mode, 
            agenda, 
            audience, 
            tags, 
            organizer 
        } = event;

        const bookings = 10;

        // Parse agenda and tags safely
        let agendaItems: string[] = [];
        let tagItems: string[] = [];
        
        try {
            agendaItems = Array.isArray(agenda) ? agenda : JSON.parse(agenda[0] || '[]');
        } catch {
            agendaItems = [];
        }
        
        try {
            tagItems = Array.isArray(tags) ? tags : JSON.parse(tags[0] || '[]');
        } catch {
            tagItems = [];
        }

        // Get similar events
        const similarEvents: Event[] = await getSimilarEventsBySlug(slug);

        return (
            <section id='event'>
                <div className='header'>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className='details'>
                    {/* Left side - Event content */}
                    <div className='content'>
                        <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

                        <section className='flex-col-gap-2'>
                            <h2>Overview</h2>
                            <p>{overview}</p>
                        </section>

                        <section className='flex-col-gap-2'>
                            <h2>Event Details</h2>
                            <EventDeatilItem icon="/icons/calendar.svg" alt='calendar' label={date} />
                            <EventDeatilItem icon="/icons/clock.svg" alt='clock' label={time} />
                            <EventDeatilItem icon="/icons/pin.svg" alt='pin' label={`${venue}, ${location}`} />
                            <EventDeatilItem icon="/icons/mode.svg" alt='mode' label={mode} />
                            <EventDeatilItem icon="/icons/audience.svg" alt='audience' label={audience} />
                        </section>

                        <EventAgenda agendaItems={agendaItems} />

                        <section className='flex-col-gap-2'>
                            <h2>About the Organizer</h2>
                            <p>{organizer}</p>
                        </section>

                        <EventTags tags={tagItems} />
                    </div>
                    {/* Right side - booking form */}

                    <aside className='booking'>
                        <div className="signup-card">
                            <h2>Book Your Spot</h2>
                            {bookings > 0 ? (
                                <p className="text-sm">
                                    Join {bookings} people who have already booked their spot!
                                </p>
                            ) : (
                                <p className="text-sm">Be the first to book your spot!!</p>
                            )}
                            <BookEvent />
                        </div>
                    </aside>
                </div>

                {/* Similar Events Section */}
                <div className='flex w-full flex-col gap-4 pt-20'>
                    <h2>Similar Events</h2>
                    <div className='events'>
                        {similarEvents.length > 0 ? (
                            similarEvents.map((similarEvent: Event) => (
                                <EventCard key={similarEvent._id} {...similarEvent} />
                            ))
                        ) : (
                            <p className="text-gray-600">No similar events found.</p>
                        )}
                    </div>
                </div>
            </section>
        )
    } catch (error) {
        console.error('Error fetching event:', error);
        return notFound();
    }
}

export default EventDetailsPage