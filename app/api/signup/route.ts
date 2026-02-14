import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from '@/models/auth/User';
import connectDB from '@/lib/db';
import Team from '@/models/frc-events/Team';
import {hashSync, genSaltSync}  from 'bcrypt-ts'


export async function POST(request: NextRequest) {

 await connectDB();
 const formData = await request.formData();
 const salt = genSaltSync(10);
  let password = "Password"
  if (formData.get("Password") !== null){
    password = formData.get("Password") || ""
  }
 
 const signupData = {
 teamNumber: formData.get("TeamNumber"),
  managerName ,
  managerEmail,
  managerPassword: hashSync(password, salt),
  managerPhoneNumber: formData.get("PhoneNumber");
  roleOnTeam: string;

 }


  const name = formData.get('name');



    // chekc if team number exists in database, if not return error,
    const team = await Team.findOne({ number:  });
    if (!team) {
        return NextResponse.json({ success: false, message: 'Team number not found' }, { status: 404 });
    }
    // Check if team already exists
    const existingTeam = await User.findOne({ number: body.number });
    if (existingTeam) {
        return NextResponse.json({ success: false, message: 'Team number already registered' }, { status: 409 });
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
      const result = await User.findOneAndUpdate({email: body.email}, body as IUser, {upsert: true, new: true});

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