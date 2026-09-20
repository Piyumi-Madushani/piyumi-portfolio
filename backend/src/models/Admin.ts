import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;