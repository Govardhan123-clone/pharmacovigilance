"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = tag ? `/api/questions?tag=${tag}` : "/api/questions";
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setQuestions(data.questions);
      } else {
        console.error("Error fetching questions:", data.error);
      }
    };

    fetchQuestions();
  }, [tag]);

  return (
    <div>
      <h1>Questions {tag && `for tag #${tag}`}</h1>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <a href={`/questions/${q.id}`}>{q.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
