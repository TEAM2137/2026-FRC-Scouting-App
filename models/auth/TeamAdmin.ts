import mongoose from "mongoose";

export interface ITeamAdmin {
  teamNumber: string;
  managerName: string;
  managerEmail: string;
  managerPassword: string;
  managerPhoneNumber: string;
  roleOnTeam: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TeamAdminSchema = new mongoose.Schema<ITeamAdmin>(
  {
    teamNumber: {
      type: String,
      required: true,
      unique: true,
    },
    managerName: {
      type: String,
      required: true,
    },
    managerEmail: {
      type: String,
      required: true,
      unique: true,
    },
    managerPassword: {
      type: String,
      required: true,
    },
    managerPhoneNumber: {
      type: String,
      required: true,
    },
    roleOnTeam: {
      type: String,
      required: true,
      enum: ["manager", "coach", "scout"],
    },
  },
  {
    timestamps: true,
  }
);

const TeamAdmin =
  mongoose.models?.TeamAdmin ||
  mongoose.model<ITeamAdmin>("TeamAdmin", TeamAdminSchema);

export default TeamAdmin;