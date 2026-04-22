import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connect";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  const { email, newPassword } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;
  user.otp = undefined;
  user.otpExpiry = undefined;

  await user.save();

  return NextResponse.json({ message: "Password updated successfully" });
}