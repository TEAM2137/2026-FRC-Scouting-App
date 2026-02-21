import mongoose from "mongoose";

export interface IPitscout {
  maxFuelCarry: number;
  PassPosition: boolean;
  scoringPosition: number;
  autonPath: string;
  canGoThroughTrench: boolean;
  createdAt: Date;
  updatedAt: Date;
  intakeType: string;
  autonClimb: boolean;
  closedHopper: boolean;
  multishot: number;
  climbLevelTeleop: number;
  launchSpeed: number;
}

const UserSchema = new mongoose.Schema<IPitscout>(
    {
        number: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        isManager: {
             type: Boolean,
             default: false,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
);

const pitscout = mongoose.models?.User || mongoose.model<IPitscout>("User", UserSchema);

export default pitscout;