import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function evaluateAnswerbyGemi(question, answer) {
  
  const prompt = `
You are an AI interviewer. Based on the following question and answer, rate the candidate in the following areas (scale of 0 to 10):

- Clarity of explanation
- Content relevance
- Keyword usage/match
- Overall performance

Return JSON only in this format:
{
  "clarity": number,
  "contentScore": number,
  "keywordMatch": number,
  "overallScore": number
}

Question:
${question}

Answer:
${answer}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  const result = await response.text();

  try {
    const parsed = JSON.parse(result);
    return parsed;
  } catch (err) {
    console.error("Failed to parse Gemini feedback:", result);
    throw new Error("Gemini returned invalid response");
  }
}

export default evaluateAnswerbyGemi;
