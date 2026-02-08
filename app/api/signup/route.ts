import { NextRequest, NextResponse } from 'next/server';
import { signUpTeamAdmin } from '@/lib/ServerSideFunctions';
import TeamAdmin, { ITeamAdmin } from '@/models/auth/TeamAdmin';
import connectDB from '@/lib/db';
import teams from '@/models/FRC-API/Teams';
export async function POST(request: NextRequest) {

 await connectDB();


  const body = await request.json(
 
 
 
 
);
    // chekc if team number exists in database, if not return error,
    const team = await teams.findOne({ teamNumber: body.teamNumber });
    if (!team) {
        return NextResponse.json({ success: false, message: 'Team number not found' }, { status: 404 });
    }
    // Check if team already exists
    const existingTeam = await TeamAdmin.findOne({ teamNumber: body.teamNumber });
    if (existingTeam) {
        return NextResponse.json({ success: false, message: 'Team number already registered' }, { status: 409 });
    }
    }
    // Validate required fields
    const requiredFields = ['teamNumber', 'managerName', 'managerEmail', 'managerPassword', 'managerPhoneNumber', 'roleOnTeam'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
  
    // Validate team number is numeric
    if (isNaN(Number(body.teamNumber))) {
      return NextResponse.json(
        { success: false, message: 'Team number must be numeric' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.managerEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phoneRegex = /^[\d\-\+\(\) ]+$/;
    if (!phoneRegex.test(body.managerPhoneNumber)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    try {
      // Call server function to save to database
      const result = await signUpTeamAdmin(body as ITeamAdmin);

      if (result.success) {
        return NextResponse.json(result, { status: 201 });
      } else {
        return NextResponse.json(result, { status: 400 });
      }
    } catch (error) {
      console.error('Signup error:', error);
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      );
    }

