import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

export const extractTextFromFile = async (filePath, fileName) => {
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at path: ${filePath}`);
  }

  try {
    const buffer = fs.readFileSync(filePath);

    if (fileName.endsWith(".pdf")) {
      const data = await pdfParse(buffer);
      return data.text;
    } else if (fileName.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else {
      throw new Error(
        "Unsupported file format. Only PDF and DOCX are allowed."
      );
    }
  } catch (error) {
    console.error("Error extracting text from file:", error);
    throw new Error("Failed to extract text from file.");
  }
};
