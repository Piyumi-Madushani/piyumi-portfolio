import mongoose, { Document, Schema } from "mongoose";

export interface IExperience extends Document {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
  current: boolean;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      default: "",
    },

    description: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    current: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model<IExperience>(
  "Experience",
  experienceSchema
);

export default Experience;