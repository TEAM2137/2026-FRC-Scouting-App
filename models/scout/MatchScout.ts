import mongoose from "mongoose";

export interface IMatchScout {
matchID: string,
teamNumber: string,
eventCode: string,
tournamentLevel: string,
matchNumber: string,
alliancePosition: string,
autoLaunches: number,
firstShiftLauches: number,
secondShiftLauches: number,
endgameLaunches: number,
robotDied: number,
robotBroke: number,
passHeard: number,
passLaunched: number,
}

export const MatchScoutschema = new mongoose.Schema<IMatchScout>(
{
    matchID: {
        type:String,
        required: true,
        unique: true
    },
    teamNumber:{ type: String },
    eventCode: { type: String },
    tournamentLevel: { type: String },
    matchNumber: { type: String },
    alliancePosition: { type: String },
    autoLaunches: { type: Number },
    firstShiftLauches: { type: Number },
    secondShiftLauches: { type: Number },
    endgameLaunches: { type: Number },
    robotDied: { type: Number },
    robotBroke: { type: Number },
    passHeard: { type: Number },
    passLaunched: { type: Number },
}
)
const MatchScout = mongoose.models?.MatchScout || mongoose.model<IMatchScout>("MatchScout", MatchScoutschema)

export default MatchScout;