import mongoose from "mongoose";

export interface IMatchscout {
//totalShotsAuto: number,
//totalPassedAuto: number, 
IFuelNumb: number,
ToeTalScorn: number,
//totalHerded: number,
// totalPassedTeleop: number,
// totalShotsTeleop: number,
IsHangerLevel: number,
// didDie: number,
// idBreak: number
// idAutoClimb: number,
MeetTheTeam: number,
//meta data for the file
//createdAt: Date,
//updatedAt: Date,
TeamColor: string,

}

export const Matchscoutschema = new mongoose.Schema<IMatchscout>(
{

        IFuelNumb:{
            type: Number,
            required: false,
        },
        ToeTalScorn:{
            type: Number,
            required: false,
        },
        IsHangerLevel:{
            type: Number,
            required: false,
        },
        MeetTheTeam:{
            type: Number,
            required: false,
        },
        TeamColor:{
            type: String,
            required: false,
        }
    }
)
const Matchscout = mongoose.models?.Matchscout || mongoose.model<IMatchscout>("Matchscout", Matchscoutschema)

export default Matchscout;