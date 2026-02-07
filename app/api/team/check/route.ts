import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TeamAdmin from '@/models/auth/TeamAdmin';

// GET /api/team/check?teamNumber=12345
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teamNumber = searchParams.get('teamNumber');

  try {
    await connectDB();

    if (teamNumber) {
      const team = await TeamAdmin.findOne({ teamNumber }).select('-managerPassword').lean();
      if (!team) {
        return NextResponse.json({ exists: false, managerSignedUp: false }, { status: 200 });
      }

      return NextResponse.json({ exists: true, managerSignedUp: true, manager: team }, { status: 200 });
    }

    // No teamNumber provided -> return list of registered team numbers
    const teams = await TeamAdmin.find({}, { teamNumber: 1, _id: 0 }).lean();
    const teamNumbers = teams.map(t => t.teamNumber);
    return NextResponse.json({ teamNumbers }, { status: 200 });
  } catch (err) {
    console.error('Team check error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
