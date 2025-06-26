import Resume from "../models/resumeModel.js";
import Email from "../models/emailModel.js";
import mongoose from "mongoose";



export const getDashboardMetrics = async (req, res) => {
  try {
    const userId = req.userId;

    // 1. Total Emails Created
    const totalEmails = await Email.countDocuments({ userId });

    // 2. Total Words Generated
    const emailDocs = await Email.find({ userId });
    const totalWordsGenerated = emailDocs.reduce((acc, email) => {
      return (
        acc +
        (email.generatedEmail ? email.generatedEmail.split(/\s+/).length : 0)
      );
    }, 0);

    // 3. Total Resumes Analyzed
    const totalResumes = await Resume.countDocuments({ user: userId });

    // 4. Average Resume Score
    const resumeDocs = await Resume.find({ user: userId });
    const scores = resumeDocs
      .map((r) => parseFloat(r.score))
      .filter((score) => !isNaN(score));
    const avgResumeScore =
      scores.length > 0
        ? (scores.reduce((sum, s) => sum + s, 0) / scores.length).toFixed(2)
        : "0.00";

    // 5. Email Chart Data
    const emailChartData = await Email.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          emails: { $sum: 1 },
          words: {
            $sum: {
              $strLenCP: "$generatedEmail",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 6. Resume Chart Data
    const resumeChartData = await Resume.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          resumes: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

      // Return All Metrics
      
      
    res.status(200).json({success:true,
      totalEmails,
      totalWordsGenerated,
      totalResumes,
      avgResumeScore,
      emailChartData,
      resumeChartData,
    });
  } catch (error) {
    console.error("Dashboard Metrics Error:", error);
    res.status(500).json({ error: "Failed to load dashboard metrics" });
  }
};