import mongoose from "mongoose";


export interface IQualitativeScout {
    [x: string]: any;
    qualitativeScoutID: string,
    teamNumber: string,
    scoutTeamNumber: string,
    eventCode: string,
    driverSkill: number,
    robotReliability: number,
    additionalNotes: string,
    createdAt: Date,
    updatedAt: Date,
}


export const QualitativeScoutSchema = new mongoose.Schema<IQualitativeScout>(
    {
        qualitativeScoutID: {
            type: String,
            required: true,
            unique: true,   
        },
        teamNumber: { type: String },
        scoutTeamNumber: { type: String },
        eventCode: { type: String },
        driverSkill: { type: Number },  
        robotReliability: { type: Number },
        additionalNotes: { type: String },
        createdAt: { type: Date, default: Date.now, },
        updatedAt: { type: Date, default: Date.now, },
    }
)
export const QualitativeScout = mongoose.models?.QualitativeScout || mongoose.model<IQualitativeScout>("QualitativeScout", QualitativeScoutSchema)
export default QualitativeScout;