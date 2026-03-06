'use server'

import connectDB from "@/lib/db"
import ScoutMatch from "@/models/scout/MatchScout"


export async function getEventScoutMatches(eventCode: string) {
    try {
        await connectDB();
        const match = await ScoutMatch.find({ eventCode: eventCode }).sort({ matchNumber: 1 });
        if (match === null) {
            return null;
        }
        return JSON.stringify(match);
    } catch (error) {
        console.log(error);
        return null;
    }
}