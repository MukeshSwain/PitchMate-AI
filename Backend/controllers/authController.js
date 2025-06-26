import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateToken from "../config/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import { sendMail } from "../services/emailService.js";

export const register = async (req, res) => {
    
    
    const { name, email, password } = req.body
    const profilePic = req.file?.path
    console.log("whfurguifguirgfgruifgr");
    
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields",success:false })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists",success:false })
        }
        const hasshedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password:hasshedPassword
        })
        if (profilePic) {
          try {
            const result = await cloudinary.uploader.upload(profilePic, {
              folder: "user-profiles", // optional: organize uploads
              width: 500,
              crop: "scale",
              resource_type: "image",
            });
              newUser.profilePic = result.secure_url
              
          } catch (uploadErr) {
            
            return res
              .status(500)
              .json({ message: "Image upload failed", success: false });
          }
        }
        await newUser.save()
        await sendMail({
          to: email,
          subject: "Welcome to PitchMate AI",
          html: `<h2>Hi ${newUser.name},</h2>
<p>Thanks for signing up!</p>
<p>You're all set to generate professional emails effortlessly and get smart resume analysis tailored to your target job roles.</p>
<p>Start now and take the next step in your career with confidence!</p>
<p>Best regards,<br>PitchMate AI</p>`,
        });
        res.status(201).json({ message: "User created successfully",success:true })
    } catch (error) {
        console.log("Error in register : ", error.message);
        res.status(500).json({ message: "Internal Server Error",success:false })
        
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields",success:false })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found",success:false })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials",success:false })
        }
        const token = generateToken(user._id, res)
        // console.log(token);
        
        res.status(200).json({
            message: "User logged in successfully", success: true, user: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
        } })
    } catch (error) {
        console.log("Error in login : ", error.message);
        res.status(500).json({ message: "Internal Server Error",success:false })
        
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("email_writer")
        res.status(200).json({ message: "User logged out successfully",success:true })
    } catch (error) {
        console.log("Error in logout : ", error.message);
        res.status(500).json({ message: "Internal Server Error",success:false })
        
    }
}