import { NextRequest, NextResponse } from 'next/server';
import { signupStudent } from '@/lib/ServerSideFunctions';

interface StudentSignup {
  teamNumber: string;
  StudentName: string;
  StudentEmail: string;
  StudentPassword: string;
}

export async function POST(request: NextRequest) {
  try {
    const adminData = await request.json();

    // check if team number exists in database
    const team = await TeamAdmin.findOne({ teamNumber: adminData.teamNumber });
    if (!team) {
      return NextResponse.json({ success: false, message: 'Team number not found' }, { status: 404 });
    }

    // Check if team already registered (you probably meant a different collection/field)
    const existingTeam = await TeamAdmin.findOne({ teamNumber: adminData.teamNumber });
    if (existingTeam) {
      return NextResponse.json({ success: false, message: 'Team number already registered' }, { status: 409 });
    }

    // Check if email already exists
    const existingEmail = await TeamAdmin.findOne({ managerEmail: adminData.managerEmail });
    if (existingEmail) {
      return NextResponse.json({ success: false, message: 'Email already registered' }, { status: 409 });
    }

    // Save admin data to the database
    const newAdmin = new TeamAdmin({
      teamNumber: adminData.teamNumber,
      managerEmail: adminData.managerEmail,
      managerPassword: adminData.managerPassword, // Ensure this is hashed in the schema pre-save hook
    });

    await newAdmin.save();

    return NextResponse.json({ success: true, message: 'Team admin registered successfully' }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Error registering team admin' }, { status: 500 });
  }
}
