import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { eventCode: string } }) {  
    const { eventCode } = await params;

    console.log('Fetching Event Schedule for ' + eventCode);

    // Define FRC-Events API URL
    const url = 'https://frc-api.firstinspires.org/v3.0/2026/schedule/' + eventCode + '?tournamentLevel=Qualification';

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
    if (data.Schedule.length === 0) {
        return NextResponse.json({ error: 'No matches found for the event ' + eventCode });
    }



    return NextResponse.json(data.Schedule);


}