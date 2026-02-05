import mongoose from "mongoose";
import { report } from "process";

export interface IPitReport {
reportID: string,
teamID: string,
scoutID: string,
dirveTrain: string,
autoClimb: boolean,
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
    driveTrain: {
        type: String,
        required: true,
    },
    autoClimb: {
        type: Boolean,
        required: true,
    },
    fuelCapacity: {
        type: Number,
        required: true,
    }
})

const Example = mongoose.models?.Example || mongoose.model<IPitReport>('Example', PitReportSchema);

export default Example;