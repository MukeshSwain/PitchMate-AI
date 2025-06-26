import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


import connectDB from "./config/db.js"
import authRouter from "./routes/authRoutes.js"
import mailRoute from "./routes/emailRoutes.js"
import resumeRoute from "./routes/resumeRoutes.js"
import dashboardRoute from "./routes/dashboardRoute.js"

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

//routes add
app.use("/api/auth", authRouter)
app.use("/api/email", mailRoute)
app.use("/api/resume", resumeRoute)
app.use("/api/dashboard", dashboardRoute)


export default app
