import mongoose from "mongoose";

export interface IMatchscout {
teamNumber: number, 
eventCode: number, 
tournomentLevel: string,
matchNumber: number,
scoutTeamNumber: number,
launchAuto: number,
totalShotsAuto: number,
totalPassedAuto: number,
totalScored: number,
totalHerded: number,
totalPassedTeleop: number,
totalShotsTeleop: number,
climbLevelTeleop: number,
didDie: number,
didBreak: number
didAutoClimb: number,
//meta data for the file
isHidden: boolean,
isIgnored: boolean,
createdAt: Date,
updatedAt: Date,
}

export const Matchscoutschema = new mongoose.Schema<IMatchscout>(
{
        launchAuto:{
        type: Number,
        required: true,
        },    
    totalShotsAuto:{
            type: Number,
            required: true,
        },
        totalPassedAuto:{
            type: Number,
            required: true,
        },
        totalScored:{
            type: Number,
            required: true,
        },
        totalHerded:{
            type: Number,
            required: true,
        },
        totalPassedTeleop:{
            type: Number,
            required: true,
        },
        totalShotsTeleop:{
            type: Number,
            required: true,
        },
        climbLevelTeleop:{
            type: Number,
            required: true,
        },
        didDie:{
            type: Number,
            required: true,
        },
        didBreak:{
            type: Number,
            required: true,
        },
        didAutoClimb:{
            type: Number,
            required: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        updatedAt:{
            type: Date,
            default: Date.now,
        },
    isHidden:{
        type: Boolean
    },
    isIgnored:{
        type: Boolean
    },
    }

)
const Matchscout = mongoose.models?.Matchscout || mongoose.model<IMatchscout>("Matchscout", Matchscoutschema)

export default Matchscout;