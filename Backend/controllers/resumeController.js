import fs from "fs";

import analyzeResume from "../services/resumeService.js";
import { extractTextFromFile } from "../config/extractFile.js"; // adjust path accordingly
import cloudinary from "../config/cloudinary.js";
import Resume from "../models/resumeModel.js";
import { sendMail } from "../services/emailService.js";
import User from "../models/userModel.js";

export const analyzeUploadedResume = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    
    const jobTitle = req.body.jobTitle;

    if (!file || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: "Resume file and job title are required.",
      });
    }

    const filePath = file.path;
    const fileName = file.originalname;

    const resumeText = await extractTextFromFile(filePath, fileName);
    const aiResponse = await analyzeResume(resumeText, jobTitle);

    const cleaned = aiResponse.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ AI JSON Parse Error:", err, "\nResponse:", cleaned);
      fs.existsSync(filePath) && fs.unlinkSync(filePath);
      return res
        .status(500)
        .json({ success: false, message: "Invalid AI response format." });
    }

    fs.existsSync(filePath) && fs.unlinkSync(filePath); // Clean up file

    const saved = await Resume.create({
      user: req.userId,
      jobTitle,
      fileName,
      resumeText,
      score: parsed.score,
      keySkills: parsed.key_skills,
      missingSkills: parsed.missing_skills,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      suggestions: parsed.suggestions,
      summary: parsed.summary,
    });

    const user = await User.findById(req.userId);

    if (user?.email) {
      await sendMail({
        to: user.email,
        subject: `Your Resume Analysis for "${jobTitle}" is Ready!`,
        html: `
          <h2>Your Resume Analysis for "${jobTitle}"</h2>
          <p><strong>Score:</strong> ${parsed.score}</p>
          <p><strong>Key Skills:</strong> ${parsed.key_skills.join(", ")}</p>
          <p><strong>Missing Skills:</strong> ${parsed.missing_skills.join(
            ", "
          )}</p>
        `,
      });
    }

    res.status(200).json({ success: true, analysis: parsed });
  } catch (error) {
    console.error("❌ Resume Analysis Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during resume analysis.",
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const history = await Resume.find({ user: userId }).sort({ createdAt: -1 }).select("-resumeText");
    res.status(200).json({ history, success: true });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to analyze resume" });
  }
}

export const analyseResumeSample = async (req, res) => {
  
  try {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No resume uploaded" });
    }

    const filePath = file.path;
    const fileName = file.originalname;

    
    const resumeText = await extractTextFromFile(filePath, fileName);

    
    fs.unlinkSync(filePath);

    // Analyze resume with AI
    const aiResponse = await analyzeResume(resumeText, req.body.jobTitle);
    const cleaned = aiResponse.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    

    res.status(200).json({
      success: true,
      analysis: parsed,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to analyze resume" });
  }
}
