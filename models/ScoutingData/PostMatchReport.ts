import mongoose from "mongoose";

export interface MatchReport{
AmmountScored: Number;
AmmountLaunched: number;
ClimbLevel: number;
DidCLimb:boolean;
DidWin: boolean;
DidRobotDissconnect: boolean;
}

const MatchReportSchema = new mongoose.Schema({
    AmmountScored: {
        type: String,
        required: true,
        unique: false,
    },
    AmmountLaunched: {
        type: String,
        required: false,
    },
    ClimbLevel: {
        type: Number,
        required: false,
    },
    DidCLimb: {
            type: Boolean,
            required: true,
        },   
    DidWin: {
        type: Boolean,
        required: true,
    },
    DidRobotDissconnect: {
            type: Boolean,
            required: true,  
        },
    }
);

const MatchReport = mongoose.models?.MatchReport || mongoose.model<MatchReport>('MatchReport', MatchReportSchema);
export default MatchReport;
//Need to add more API features later such as the win condition.