import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Questions() {
  const questions = await prisma.question.findMany({ include: { user: true } });

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h2>{question.title}</h2>
            <p>{question.content}</p>
            <p>Asked by {question.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
