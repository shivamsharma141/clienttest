import { NextResponse } from "next/server";
import  connectDB  from "@/lib/connect";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  const { email, otp } = await req.json();

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return NextResponse.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "OTP verified" });
}