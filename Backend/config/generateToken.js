import jwt from "jsonwebtoken";

const generateToken = (userId,res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("email_writer", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
    });
    return token
};

export default generateToken