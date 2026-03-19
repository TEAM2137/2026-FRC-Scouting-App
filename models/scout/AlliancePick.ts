import mongoose from "mongoose";

export interface IAlliancePick {
    teamNumber: string,
    pickNumber: number,
   pickRank: number,
   scoutTeamNumber: string,
}


export const AlliancePickSchema = new mongoose.Schema<IAlliancePick>(
    {
        teamNumber: { type: String },
        pickNumber: { type: Number },
        pickRank: { type: Number },
        scoutTeamNumber: { type: String },
    }
)
    const AlliancePick = mongoose.models?.AlliancePick || mongoose.model<IAlliancePick>("AlliancePick", AlliancePickSchema)

export default AlliancePick;