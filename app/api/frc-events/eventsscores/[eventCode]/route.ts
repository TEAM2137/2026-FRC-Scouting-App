import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest, { params }: { params: { eventCode: string } }) {
    const { eventCode } = await params;
    console.log('Fetching Score Details for ' + eventCode);

    // Define FRC-Events API URL
    const url = 'https://frc-api.firstinspires.org/v3.0/2026/scores/' + eventCode + '/qualification';

    // Fetch data from FRC-Events API
    const response = await fetch(`${url}`,
        {
            headers: {
                'Authorization': `Basic ${process.env.FRC_AUTH}`,
                'Content-Type': 'application/json',
            },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data from FRC-Events API');
    }
    const data = await response.json();

    // Check if data is empty
    if (data.MatchScores.length === 0) {
        return NextResponse.json({ error: 'No scores found for the event ' + eventCode });
    }

    for (const score of data.MatchScores) {
        score.eventCode = eventCode;
        score.matchID = eventCode + '-' + score.matchLevel + '-' + score.matchNumber.toString();

        //await connectDB
        try {
            // const matchDoc = await EventSchedule.findOneAndUpdate({ matchID: match.matchID }, match, { upsert: true, new: true });
        } catch (error) {
            console.log(error);
            //return NextResponse.json({ error: 'Error updating EventSchedule for ' + match.matchID });
        }

    }

    return NextResponse.json(data.MatchScores);


}