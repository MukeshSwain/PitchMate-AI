import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
      type: String,
      minlength:6,
    required: true,
    },
    profilePic: {
        type: String,
        default:""
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User