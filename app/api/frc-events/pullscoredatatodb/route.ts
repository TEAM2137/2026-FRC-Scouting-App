import { NextRequest, NextResponse } from "next/server";

// Define DB COnnection for getting/storing data
import connectDB from "@/lib/db";


export async function GET(req: NextRequest) {

    console.log('Fetching Events');

    //Get Events from the DB
    

    try {
        await connectDB();
        const eventsScore = await MatchScores.find()
        if (MatchScores.length === 0) {
            return NextResponse.json({ error: 'No event scores found in the database' });
        } else {
            return NextResponse.json(events);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error retrieving events' }); 
    }

}