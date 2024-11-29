import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Import the Prisma client

// Mock categories and hashtags (for demonstration purposes)
const categories = [
  "ICSR",
  "Aggregate safety reports",
  "Signal management",
  "RMP",
  "Labelling",
  "PSMF",
  "Vendor management",
];

const hashtags = [
  "Case triage",
  "Case processing",
  "ICSR Submissions",
  "PBRER",
  "Signal detection",
  "Signal assessment",
];

// GET: Fetch all questions
export async function GET() {
  try {
    // Fetch questions from the database
    const questions = await prisma.question.findMany({
      include: {
        user: true,       // Include user details
        tags: true,       // Include associated tags
        answers: true,    // Include associated answers
      },
    });

    // Enrich questions with mock categories and hashtags
    const enrichedQuestions = questions.map((q) => ({
      ...q,
      category: categories[Math.floor(Math.random() * categories.length)],
      hashtags: hashtags.slice(0, Math.floor(Math.random() * hashtags.length) + 1),
    }));

    return NextResponse.json({ questions: enrichedQuestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

// POST: Create a new question
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, userId, tags } = body;

    // Basic validation
    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: "Title, content, and userId are required" },
        { status: 400 }
      );
    }

    // Create the question in the database
    const question = await prisma.question.create({
      data: {
        title,
        content,
        userId,
        tags: tags?.length
          ? {
              connect: tags.map((tagId: number) => ({ id: tagId })),
            }
          : undefined,
      },
    });

    return NextResponse.json(
      { message: "Question created successfully", question },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating question:", error);

    // Enhanced error handling for debugging
    return NextResponse.json(
      { error: "Failed to create question", details: error.message },
      { status: 500 }
    );
  }
}
