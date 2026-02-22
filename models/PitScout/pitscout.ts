import mongoose from "mongoose";

export interface IPitscout {
  maxFuelCarry: number;
  PassPosition: number;
  scoringPosition: number;
  autonPath: string;
  canGoThroughTrench: boolean;
  createdAt: Date;
  updatedAt: Date;
  intakeType: string;
  autonClimb: boolean;
  closedHopper: boolean;
  multishot: number;
  teleopClimb: number;
  launchSpeed: number;
}

export const PitscoutSchema = new mongoose.Schema<IPitscout>(
    {
        maxFuelCarry: {
            type: Number,
            required: true,
        },
        PassPosition: {
            type: Number,
            required: true,
        },
         scoringPosition: {
            type: Number,
            required: true,
            unique: true,
        },
        autonPath: {
            type: String,
            required: false,
        },
        autonClimb: {
            type: Boolean,
            required: true,
        },
        intakeType: {
            type: String,
            required: true,
        },
        canGoThroughTrench: {
             type: Boolean,
             default: false,
        },
        teleopClimb: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        closedHopper:{
            type: Boolean,
            required:true
        },
        multishot:{
            type: Number,
            required:true
        },
        launchSpeed:{
            type: Number,
            required: true
        },
    },
);

const pitscout = mongoose.models?.User || mongoose.model<IPitscout>("Pitscout", PitscoutSchema);

export default pitscout;