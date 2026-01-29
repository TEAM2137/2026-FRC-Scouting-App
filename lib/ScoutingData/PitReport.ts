'use server'

import connectDB from '@/lib/db';
import PitReport from '@/models/ScountingData/PitReport';
import { IPitReport } from '@/models/ScountingData/PitReport';


export const storePitReport = async (pitReportDATA: IPitReport) => {
    try {
        await connectDB();
        const result = await PitReport.findOneAndUpdate({ reportID: pitReportDATA.reportID }, pitReportDATA, { upsert: true, new: true });
        if (result) {
            return ({ success: true, message: 'PitReport stored successfully' });
        }
        return ({ success: false, message: 'PitReport no stored successfully' });
    } catch (err) {
        console.log(err);
        return ({ success: false, message: 'Error storing PitReport' });
    }
}

