import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content, userId } = req.body;

    const question = await prisma.question.create({
      data: {
        title,
        content,
        user: { connect: { id: userId } }
      }
    });

    res.status(201).json(question);
  }
}
