export type EventItem = {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events: EventItem[] = [
    {
        title: 'Tech Summit 2026',
        image: '/images/event1.png',
        slug: 'tech-summit-2026',
        location: 'Bangalore International Exhibition Centre, Bangalore',
        date: 'March 15, 2026',
        time: '10:00 AM - 6:00 PM'
    },
    {
        title: 'Startup Pitch Night',
        image: '/images/event2.png',
        slug: 'startup-pitch-night',
        location: 'WeWork Galaxy, Gurugram',
        date: 'February 20, 2026',
        time: '7:00 PM - 10:00 PM'
    },
    {
        title: 'Music Festival 2026',
        image: '/images/event3.png',
        slug: 'music-festival-2026',
        location: 'Jawaharlal Nehru Stadium, Delhi',
        date: 'April 5, 2026',
        time: '4:00 PM - 11:00 PM'
    },
    {
        title: 'AI & Machine Learning Workshop',
        image: '/images/event4.png',
        slug: 'ai-ml-workshop',
        location: 'IIT Bombay Campus, Mumbai',
        date: 'March 28, 2026',
        time: '9:00 AM - 5:00 PM'
    },
    {
        title: 'Food & Culture Carnival',
        image: '/images/event5.png',
        slug: 'food-culture-carnival',
        location: 'Jaipur Exhibition & Convention Centre, Jaipur',
        date: 'February 14, 2026',
        time: '11:00 AM - 9:00 PM'
    },
    {
        title: 'Digital Marketing Masterclass',
        image: '/images/event6.png',
        slug: 'digital-marketing-masterclass',
        location: 'Hyderabad International Convention Centre, Hyderabad',
        date: 'March 10, 2026',
        time: '2:00 PM - 7:00 PM'
    }
]

export default events;