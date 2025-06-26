import generateEmail from "../services/geminiService.js";
import Email from "../models/emailModel.js";
import User from "../models/userModel.js";
import { sendMail } from "../services/emailService.js";

export const generateEmailHandler = async (req, res) => {
  
  

  
  try {
    
    const { topic, tone, description, name, email, phone } = req.body;
    
    if (!topic || !tone || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }
  const user = await User.findById(req.userId)
    const generatedEmail = await generateEmail(
      topic,
      tone,
      description,
      name,
      email,
      phone
    );
    await sendMail({
      to: user.email,
      subject: `Your Generated Email on "${topic}"`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="color: #2563eb; text-align: left;">Your ${tone} Email on "${topic}" is Ready!</h2>
          
          <p><strong>Description:</strong> ${description}</p>
          
          <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem; white-space: pre-wrap; font-family: monospace; font-size: 14px; color: #1f2937;">
            ${generatedEmail}
          </div>
    
          <p style="margin-top: 2rem;">
            Need another email? <a href="${process.env.CLIENT_URL}/email-generator" style="color: #2563eb; text-decoration: none;">Generate again</a>
          </p>
    
          <p>Thanks,<br/>The PitchMatch AI Team</p>
        </div>
      `,
    });
    
    
    const history = await Email.create({
      userId: req.userId,
      topic,
      tone,
      description,
      generatedEmail
    })
    res.status(200).json({  email:generatedEmail ,success:true });
  } catch (error) {
    console.error("Email generation failed:", error.message);
    res.status(500).json({ error: "Failed to generate email." });
  }
};

export const generateSample = async (req, res) => {
  try {
    const { topic, tone, description, name, email, phone } = req.body;
    
    
    const generatedEmail = await generateEmail(topic, tone, description, name, email, phone);
    
    
    res.status(200).json({ email:generatedEmail });
  } catch (error) {
    console.log("Error in generateSample : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    
  }
}

export const getEmailHistory = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const history = await Email.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({history,success:true});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};