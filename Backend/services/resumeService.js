// resumeService.js
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeResume(resumeText, jobTitle) {
  const prompt = `
  You are an expert resume screening assistant trained to evaluate resumes for job relevance and quality.
  
  You must strictly analyze the resume provided below for a job application targeting the position: "${jobTitle}".
  
  Your output must be a **valid and parsable JSON** object with **no extra commentary**, **no markdown**, and **no text outside the JSON**. Invalid or malformed JSON is unacceptable.
  
  Use the following JSON structure strictly:
  
  {
    "score": "X/10",
    "key_skills": [list of strong, highly relevant skills for the job],
    "missing_skills": [list of important or expected skills missing or weak],
    "strengths": [2–4 strengths clearly demonstrated in the resume],
    "weaknesses": [2–4 weaknesses, gaps, or areas with poor presentation],
    "suggestions": [specific and actionable suggestions for improving this resume for the given job role],
    "summary": "2–3 lines summarizing the resume's overall suitability for the role."
  }
  
  Strict rules:
  - If the "key_skills" array is empty or contains no relevant skills for the job, then the "score" must be "0/10".
  - The "score" must reflect the overall relevance and quality of the resume specifically for the "${jobTitle}" role.
  - Avoid generic filler responses; focus strictly on the content of the resume.
  - Do not invent information that is not clearly present in the resume.
  
  Now analyze the following resume accordingly:
  
  Resume Content:
  """
  ${resumeText}
  """
  `;
  
    

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return response.text;
}

export default analyzeResume;
