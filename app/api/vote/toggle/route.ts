import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, userId, answerId, commentId } = req.body;

    const existingVote = await prisma.vote.findFirst({
      where: { userId, answerId, commentId }
    });

    if (existingVote) {
      await prisma.vote.delete({ where: { id: existingVote.id } });
      res.status(200).json({ message: "Vote removed" });
    } else {
      const vote = await prisma.vote.create({
        data: {
          type,
          user: { connect: { id: userId } },
          answerId,
          commentId
        }
      });
      res.status(201).json(vote);
    }
  }
}
