import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const resetToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // Here, you would send the resetToken to the user's email in a real application.
    console.log("Reset Token:", resetToken);

    return NextResponse.json({
      message: "Password reset token generated. Check your email.",
      resetToken, // Remove in production.
    });
  } catch (error) {
    console.error("Error generating reset token:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
