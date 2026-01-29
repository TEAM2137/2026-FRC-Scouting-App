import mongoose from 'mongoose';

export interface IPitReport {
    reportID: string,
    teamID: string,
    scoutID: string,
    dirveTrain: string,
    autoCLimb: boolean,
    fuelCapacity: number,
}

const PitReportSchema = new mongoose.Schema({
    reportID: {
        type: String,
        required: true,
        unique: true,
    },
    teamID: {
        type: String,
        required: true,
    },
    scoutID: {
        type: String,
        required: true,
    },
    dirveTrain: {
        type: String,
    },
    autoCLimb: {
        type: Boolean,
    },
    fuelCapacity: {
        type: Number,
    },
});

const PitReport = mongoose.models?.PitReport || mongoose.model<IPitReport>('PitReport', PitReportSchema);

export default PitReport;