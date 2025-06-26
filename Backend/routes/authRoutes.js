import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(upload.single("profilePic"),register)
router.route("/login").post(login)
router.route("/logout").get(logout)

export default router