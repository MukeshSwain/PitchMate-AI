import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, html })=>{
    const mailOptions = {
        from:`"PitchMate AI" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    }
    try {
        const info = await transporter.sendMail(mailOptions)
       
    } catch (error) {
        console.error("Email error:", error);
    return { success: false, error: error.message };
    }
}
