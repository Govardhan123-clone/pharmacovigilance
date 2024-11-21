// /app/api/questions/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch questions from the database
    const questions = await prisma.question.findMany({
      include: {
        user: true, // Include user data
      },
    });

    // Return the questions as JSON
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('Error fetching questions:', error);

    // Ensure a JSON response is sent even on errors
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
