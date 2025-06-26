import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    try {
        const token = req.cookies.email_writer;
        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId =  decoded.userId
        next();
    } catch (error) {
        console.log("Error in protect middleware : ", error.message);
        res.status(500).json({ message: "Unauthorized" });
        
    }
}

export default protect