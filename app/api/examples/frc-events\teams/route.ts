import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Team from "@/models/FRC-API/Teams";
import { ITeam } from "@/models/FRC-API/ITeams";

export async function GET(request: NextRequest) {

        const apiURL = 'https://frc-api.firstinspires.org/v3.0/teams';
        const headers = {
                'authorization': `Basic ${process.env.FRC_AUTH}`,
                'Content-Type': 'application/json'
        }
       // const response = await fetch(apiURL,
          //       { headers: headers}
          //      );
        const data = await response.json();
        response = await fetch(apiURL, { headers: headers });
        await connectDB();
        for (let i = 0; i < data.length; i++) {
                const team = await Team.findOneAndUpdate({ teamNumber: data.teams[i].teamNumber},data.teams[i], { upsert: true});
                if(!team) {
                        return NextResponse.json({success: false, message: "erm no team" });
                        break;
                }
                
                )
        }

        return NextResponse.json(data);
}