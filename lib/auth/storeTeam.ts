'use server'

import connectDB from '@/lib/db';
import Team from '@/models/auth/Team';
import { ITeam } from '@/models/auth/Team';

export const storeTeam = async (teamData: ITeam) => {
    try {
        await connectDB();
        const team = new Team(teamData);
        await team.save();
        return ({ success: true, message: 'Team saved successfully' });
    }
    catch (error) {
        return ({ success: false, message: 'Failed to save team' });
    }
}


