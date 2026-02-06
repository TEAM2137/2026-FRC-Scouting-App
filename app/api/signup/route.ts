import { NextRequest, NextResponse } from 'next/server';
import { signUpTeamAdmin } from '@/lib/ServerSideFunctions';
import { ITeamAdmin } from '@/models/auth/TeamAdmin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
}
