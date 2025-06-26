// models/InterviewSession.js
import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeText: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    questions: [
      {
        type: String,
      },
    ],
    answers: [
      {
        type: String,
      },
    ],
    analysisReport: {
      clarity: { type: Number, default: 0 },
      contentScore: { type: Number, default: 0 },
      keywordMatch: { type: Number, default: 0 },
      overallScore: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const InterviewSession = mongoose.model("InterviewSession", interviewSessionSchema);
export default InterviewSession;