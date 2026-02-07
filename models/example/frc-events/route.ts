import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Team from "@/models/FRC-API/Team";

export async function GET(request: NextRequest) {
    const apiURL = "https://frc-api.firstinspires.org/v3.0";
    const headers = {
        'authorization': `Basic ${process.env.FRC_API_KEY}`,
        'content-Type': 'application/json'
    }
    const response = await fetch(apiURL,{headers: headers });
    const data = await response.json();
    await connectDB();

    for (let i = 0; i < data.teams.length; i++) {
        try {
        const team = await Team.findOneAndUpdate({teamNumber: data.teams[i].teamNumber}, data.teams[i], {upsert: true, new: true});
        if (!team) {
            return NextResponse.json({ success: false, message: 'team not saved' });
        }
    } catch (error) {
        console.log(error);
      
    }
    return NextResponse.json({ success: true, message: 'teams saved successfully' });
}
}   