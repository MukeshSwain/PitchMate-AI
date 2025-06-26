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

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No resume uploaded" });
    }

    const filePath = file.path;
    const fileName = file.originalname;

    // Extract resume text
    const resumeText = await extractTextFromFile(filePath, fileName);

    // Upload resume to Cloudinary as raw file
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "resume-uploads",
      resource_type: "raw", // Important for PDFs and DOCX
    });

    // Clean up uploaded temp file
    fs.unlinkSync(filePath);

    // Analyze resume with AI
    const aiResponse = await analyzeResume(resumeText, req.body.jobTitle);
    const cleaned = aiResponse.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    
    // Construct correct Cloudinary raw URL manually
    const url = result.secure_url


    
    
    // Save resume and analysis to database
    await Resume.create({
      user: req.userId,
      jobTitle: req.body.jobTitle,
      fileUrl: url,
      fileName: fileName,
      resumeText: resumeText,
      score: parsed.score,
      keySkills: parsed.key_skills,
      missingSkills: parsed.missing_skills,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      suggestions: parsed.suggestions,
      summary: parsed.summary,
    });
    const user = await User.findById(req.userId);
    await sendMail({
      to: user.email,
      subject: `Your Resume Analysis for "${req.body.jobTitle}" is Ready!`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="color: #2563eb;">Your Resume Analysis for "${
            req.body.jobTitle
          }"</h2>
          
          <p>We've analyzed your resume for the <strong>${
            req.body.jobTitle
          }</strong> role. Here's what we found:</p>
          
          <ul style="background-color: #f9fafb; padding: 1rem; border-radius: 8px;">
            <li><strong>Score:</strong> ${parsed.score}</li>
            <li><strong>Key Skills:</strong> ${parsed.key_skills.join(
              ", "
            )}</li>
            <li><strong>Missing Skills:</strong> ${parsed.missing_skills.join(
              ", "
            )}</li>
          </ul>
    
          <div style="margin-top: 1rem;">
            <p><strong>Strengths:</strong></p>
            <ul>
              ${parsed.strengths.map((skill) => `<li>${skill}</li>`).join("")}
            </ul>
          </div>
    
          <p style="margin-top: 2rem;">
            Want to analyze another resume? <a href="${
              process.env.CLIENT_URL
            }/resume-checker" style="color: #2563eb; text-decoration: none;">Try again</a>
          </p>
    
          <p>Thanks,<br/>The PitchMatch AI Team</p>
        </div>
      `,
    });
    
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
