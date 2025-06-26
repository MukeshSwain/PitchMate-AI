import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    topic: {
        type: String,
        required: true,
    },
    tone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    generatedEmail: {
        type: String,
        
    },
    count: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Email = mongoose.model("Email", emailSchema);
export default Email