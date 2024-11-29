import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const questionId = parseInt(params.id);

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        answers: true,
        user: true,
      },
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
  }
}
