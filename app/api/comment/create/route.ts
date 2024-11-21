import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content, userId, questionId } = req.body;

    const answer = await prisma.answer.create({
      data: {
        content,
        question: { connect: { id: questionId } },
        user: { connect: { id: userId } }
      }
    });

    res.status(201).json(answer);
  }
}
