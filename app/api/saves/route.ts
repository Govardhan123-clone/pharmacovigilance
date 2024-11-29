import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
export async function POST(req: Request) {
    try {
      const { userId, questionId } = await req.json();
  
      if (!userId || !questionId) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
      }
  
      // Check if the question is already saved
      const existingSave = await prisma.savedQuestion.findFirst({
        where: { userId, questionId },
      });
  
      if (existingSave) {
        return NextResponse.json({ message: "Already saved" }, { status: 200 });
      }
  
      const savedQuestion = await prisma.savedQuestion.create({
        data: { userId, questionId },
      });
  
      return NextResponse.json({ savedQuestion }, { status: 201 });
    } catch (error) {
      console.error("Error saving question:", error);
      return NextResponse.json({ error: "Failed to save question" }, { status: 500 });
    }
  }
  
  export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get("userId") || "0");
    const questionId = parseInt(searchParams.get("questionId") || "0");
  
    try {
      if (!userId || !questionId) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
      }
  
      await prisma.savedQuestion.deleteMany({ where: { userId, questionId } });
      return NextResponse.json({ message: "Save removed" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting save:", error);
      return NextResponse.json({ error: "Failed to remove save" }, { status: 500 });
    }
  }
  