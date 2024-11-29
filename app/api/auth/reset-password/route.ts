import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(request: Request) {
  try {
    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json(
        { error: "Reset token and new password are required." },
        { status: 400 }
      );
    }

    const decoded: any = jwt.verify(resetToken, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
