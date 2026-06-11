import { NextResponse } from 'next/server';
import { getAvailableDates } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get('eventId');
        
        if (!eventId) {
            return NextResponse.json({ error: 'Missing eventId' }, { status: 400 });
        }

        const dates = await getAvailableDates(eventId);
        return NextResponse.json({ dates });
    } catch (error) {
        console.error('Error fetching event dates:', error);
        return NextResponse.json({ error: 'Failed to fetch dates' }, { status: 500 });
    }
}
