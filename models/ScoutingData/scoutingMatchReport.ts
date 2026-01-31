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
        DidClimb: {
            type: Boolean,
        },
     DidWin: {
        DidWin: {
          type: Boolean
            required: true,
        },
           
        }
            
        }
    },
);

const Example = mongoose.models?.Example || mongoose.model<MatchReport>('Example', MatchReport);

export default Example;