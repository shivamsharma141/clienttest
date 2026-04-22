import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    password: {
      type: String,
      required: true,
    },
      // ✅ OTP fields
    otp: String,
    otpExpiry: Date,
  },
  
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);