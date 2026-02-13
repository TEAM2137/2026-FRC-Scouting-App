import mongoose from "mongoose";

export interface IUser {
    team: number,
    managerName: string,
    managerEmail: string,
   password: string,
    managerPhoneNumber: string,
    roleOnTeam: string,
    isManager: boolean,
    isAproved: boolean,
    createdAt: Date,
    updatedAt: Date,    
}

const UserSchema = new mongoose.Schema<IUser>({
    team: { type: Number, required: true },
    managerName: { type: String, },
    managerEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    managerPhoneNumber: { type: String, },
    roleOnTeam: { type: String, },
    isManager: { type: Boolean, default: false },
    isAproved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
export default User;