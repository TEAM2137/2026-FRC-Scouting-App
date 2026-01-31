import mongoose from "mongoose";


export interface MatchReport{
AmmountScored: Number;
AmmountLaunched: number;
ClimbLevel: number;
DidCLimb:boolean;
DidWin: boolean;
DidRobotDissconnect: boolean;

}


const MatchReport = new mongoose.Schema({
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
           
    DidRobotDissconnect: {
            type: Boolean,
            required: true,
            
        },
    }
);

const Example = mongoose.models?.MatchReport || mongoose.model<MatchReport>('MatchReport', MatchReport);

export default Example;