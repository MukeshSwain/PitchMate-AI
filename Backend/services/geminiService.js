
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateEmail(
  topic,
  tone,
  description,
  name,
  email,
  phone,
  linkedin,
  portfolio
) {
  const userName = name?.trim() || "[Your Name]";
  const userEmail = email?.trim() || "[Your Email Address]";
  const userPhone = phone?.trim() || "[Your Phone Number]";
  const userLinkedIn = linkedin?.trim() || "[Link to your LinkedIn profile (Optional)]";
  const userPortfolio = portfolio?.trim() || "[Link to your Portfolio (Optional)]";

  const prompt = `
Write a ${tone} email using the following details:

- Topic: ${topic}
- Description: ${description}

User details to be used in the email:
- Name: ${userName}
- Email: ${userEmail}
- Phone: ${userPhone}
${linkedin ? `- LinkedIn: ${userLinkedIn}` : ""}
${portfolio ? `- Portfolio: ${userPortfolio}` : ""}

If any field is a placeholder like [Your Name], [Your Email Address], etc., include it as-is in the email.
Make sure the email looks professional and properly formatted.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

 
  return response.text;
}

export default generateEmail;
