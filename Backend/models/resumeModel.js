import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    resumeText: {
      type: String,
      default: "",
    },
    score: {
      type: String,
      default: "0",
    },
    keySkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,
      default: "",
    },
    suggestions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);


const Resume = mongoose.model("Resume", resumeSchema);
export default Resume