import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const question = await prisma.question.findUnique({
      where: { id: Number(id) },
      include: { answers: { include: { comments: true, votes: true } } }
    });
    res.status(200).json(question);
  }
}
