import mongoose from "mongoose";

export interface IPitScout {
  pitscoutID: string,
  teamNumber: string,
  eventCode: string,
  maxFuelCarry: number,
  PassPosition: string,
  scoringPosition: string,
  autonPath: string,
  canGoThroughTrench: boolean,
  intakeType: string,
  autonClimb: number,
  typeHopper: string,
  multishot: number,
  teleopClimb: number,
  launchSpeed: number,
  weight: number,
  driveTeam: string,
  //meta data for the file. 
  createdAt: Date,
  updatedAt: Date,
  
}

export const PitScoutSchema = new mongoose.Schema<IPitScout>(
    {
        pitscoutID: {
            type: String,
            required: true,
            unique: true,
        },
        teamNumber: {
            type: String,
            required: true,
        },
        eventCode: {
            type: String,
            required: true,
        },
        maxFuelCarry: {
            type: Number,
            required: true,
        },
        PassPosition: {
            type: String,
            required: true,
        },
         scoringPosition: {
            type: String,
            required: true,
            unique: true,
        },
        autonPath: {
            type: String,
            required: false,
        },
        autonClimb: {
            type: Number,
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
        typeHopper:{
            type: String,
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

const PitScout = mongoose.models?.PitScout || mongoose.model<IPitScout>("PitScout", PitScoutSchema);

export default PitScout;