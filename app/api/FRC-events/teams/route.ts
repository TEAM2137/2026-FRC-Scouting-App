import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/db';
import Team from '@/models/FRC-API/Teams';


export async function GET(request: NextRequest) {

    for (let p = 1; p <= 59; p++) {
        console.log('Fetching page ' + p);
        const apiURL = 'https://frc-api.firstinspires.org/v3.0/2026/teams?page=' + p;
        const headers = {
            'Authorization': `Basic ${process.env.FRC_AUTH}`,
            'Content-Type': 'application/json',
        }

        const response = await fetch(apiURL, { headers: headers });
        const data = await response.json();

        await connectDB();

        for (let i = 0; i < data.teams.length; i++) {
            try {
                const team = await Team.findOneAndUpdate({ teamNumber: data.teams[i].teamNumber }, data.teams[i], { upsert: true });
            } catch (error) {
                console.log(error);
            }
        }
    }
    return NextResponse.json({ success: true, message: 'Teams updated' });
}