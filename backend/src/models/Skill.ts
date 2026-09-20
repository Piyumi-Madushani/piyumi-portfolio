import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  level?: string;
  icon?: string;
  order: number;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;