import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;