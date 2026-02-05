import mongoose from "mongoose";

export interface ITeam {
    teamNumber: string;
    managerName: string;
}

const TeamSchema = new mongoose.Schema<ITeam>(
    {
        teamNumber: {
            type: String,
            required: true,
            unique: false,
        },
        managerName: {
            type: String,
            required: false,
        },
    },
);

const Team = mongoose.models?.Team || mongoose.model<ITeam>('Team', TeamSchema);

export default Team;