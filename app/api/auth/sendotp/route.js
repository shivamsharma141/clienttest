import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import User from "@/models/User";
import { transporter } from "@/lib/mailer";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email not registered" },
        { status: 400 }
      );
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "GAAV Password Reset OTP",
      html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`,
    });

    return NextResponse.json({ message: "OTP sent" });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error sending OTP" },
      { status: 500 }
    );
  }
}