import express from "express"
import { generateEmailHandler, generateSample, getEmailHistory } from "../controllers/emailController.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/gen", protect, generateEmailHandler)
router.get("/history", protect, getEmailHistory)
router.post("/gen/sample",generateSample )

export default router