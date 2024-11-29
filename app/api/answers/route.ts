import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, questionId, userId } = body;

    // Validate required fields
    if (!content || !questionId || !userId) {
      return NextResponse.json(
        { error: "Content, questionId, and userId are required" },
        { status: 400 }
      );
    }

    // Create the answer in the database
    const answer = await prisma.answer.create({
      data: {
        content,
        questionId,
        userId,
      },
    });

    // Return the created answer
    return NextResponse.json({ message: "Answer submitted successfully", answer }, { status: 201 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const questionId = parseInt(searchParams.get("questionId") || "0");

  try {
    if (!questionId) {
      return NextResponse.json(
        { error: "Invalid or missing questionId" },
        { status: 400 }
      );
    }

    // Fetch all answers for the given question
    const answers = await prisma.answer.findMany({
      where: { questionId },
      include: {
        user: { select: { id: true, name: true } }, // Include user details
      },
    });

    return NextResponse.json({ answers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
  }
}
