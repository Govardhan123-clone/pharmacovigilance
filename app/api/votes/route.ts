import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, questionId, answerId, voteType } = await req.json();

    if (!userId || (!questionId && !answerId)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const voteData = {
      userId,
      questionId: questionId || null,
      answerId: answerId || null,
      voteType,
    };

    // Create or update vote
    const existingVote = await prisma.vote.findFirst({
      where: { userId, questionId, answerId },
    });

    let vote;
    if (existingVote) {
      vote = await prisma.vote.update({
        where: { id: existingVote.id },
        data: { voteType },
      });
    } else {
      vote = await prisma.vote.create({ data: voteData });
    }

    return NextResponse.json({ vote }, { status: 201 });
  } catch (error) {
    console.error("Error handling vote:", error);
    return NextResponse.json({ error: "Failed to handle vote" }, { status: 500 });
  }
}
