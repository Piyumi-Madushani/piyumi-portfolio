import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    technologies: {
      type: [String],
      default: [],
    },

    githubUrl: {
      type: String,
      default: "",
    },

    liveUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;