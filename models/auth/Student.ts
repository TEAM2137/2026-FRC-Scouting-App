import mongoose from "mongoose";

export interface IStudent {
  teamNumber: string;
  StudentName: string;
  StudentEmail: string;
  StudentPassword: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StudentSchema = new mongoose.Schema<IStudent>(
  {
    teamNumber: {
      type: String,
      required: true,
    },
    StudentName: {
      type: String,
      required: true,
    },
    StudentEmail: {
      type: String,
      required: true,
      unique: true,
    },
    StudentPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models?.Student ||
  mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
