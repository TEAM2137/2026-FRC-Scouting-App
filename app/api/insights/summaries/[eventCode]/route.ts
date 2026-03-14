import { NextRequest, NextResponse } from 'next/server';

// Define DB COnnection for getting/storing data
import connectDB from "@/lib/db";
import MatchSummary from '@/models/insights/MatchSummary';



export async function GET(req: NextRequest, eventCode: string) {

    
    if (eventCode === null) {
        return NextResponse.json({ error: 'No event code provided' });
    }

    try {
        await connectDB();
        const matchSummary = await MatchSummary.find({ eventCode: eventCode }).sort({ matchNumber: 1 });
        if (matchSummary === null) {
            return NextResponse.json({ error: 'No match summaries found for the event code ' + eventCode });
        }
        return NextResponse.json(matchSummary);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error retrieving match summaries for the event code ' + eventCode });
    }

}   