import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db"; // Replace with your DB setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id } = req.query;

    // Increment likes in database
    await db.question.update({
      where: { id: parseInt(id as string, 10) },
      data: { likes: { increment: 1 } },
    });

    res.status(200).json({ message: "Liked successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
