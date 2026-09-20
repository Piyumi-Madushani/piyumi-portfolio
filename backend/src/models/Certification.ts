import mongoose, { Document, Schema } from "mongoose";

export interface ICertification extends Document {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  status?: string;
}

const certificationSchema = new Schema<ICertification>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    issuer: {
      type: String,
      required: true,
      trim: true,
    },

    issueDate: {
      type: String,
      required: true,
    },

    credentialId: {
      type: String,
      default: "",
    },

    credentialUrl: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Certification = mongoose.model<ICertification>(
  "Certification",
  certificationSchema
);

export default Certification;