import express from "express";
import upload from "../middleware/resumeUpload.js";
import {
  analyseResumeSample,
  analyzeUploadedResume,
  getHistory,
} from "../controllers/resumeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
  "/analyse",
  protect,
  upload.single("resume"),
  analyzeUploadedResume
);
router.get("/history", protect, getHistory);
router.post(
  "/analyse/sample",

  upload.single("resume"),
  analyseResumeSample
);

export default router;
