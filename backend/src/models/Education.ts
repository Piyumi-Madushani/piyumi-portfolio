import mongoose, { Document, Schema } from "mongoose";

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  specialization?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  grade?: string;
  current: boolean;
}

const educationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },


    field: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
  type: String,
  default: "",
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
      type: String,
      default: "",
    },

    grade: {
      type: String,
      default: "",
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

const Education = mongoose.model<IEducation>(
  "Education",
  educationSchema
);

export default Education;