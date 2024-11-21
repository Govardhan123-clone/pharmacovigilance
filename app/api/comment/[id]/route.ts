import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Fetch all comments for the question
    const comments = await db.comment.findMany({ where: { questionId: parseInt(id as string, 10) } });
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    const { content } = req.body;

    // Add a new comment
    const comment = await db.comment.create({
      data: { questionId: parseInt(id as string, 10), content },
    });

    res.status(201).json(comment);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
