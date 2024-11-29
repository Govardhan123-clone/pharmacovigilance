"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function QuestionsList() {
  const [questions, setQuestions] = useState<any[]>([]); // Ensure questions is an array
  const [error, setError] = useState<string>(""); // Error handling

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions");

        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`Failed to fetch questions: ${errorMessage}`);
        }

        const data = await res.json();
        if (Array.isArray(data.questions)) {
          setQuestions(data.questions); // Ensure fetched data is an array
        } else {
          setQuestions([]); // Fallback to an empty array if structure isn't as expected
        }
      } catch (err: any) {
        console.error("Error fetching questions:", err.message);
        setError("Failed to load questions. Please try again later.");
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      <Link href="/questions/create">
        <button>Ask a Question</button>
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <li key={question.id}>
              <Link href={`/questions/${question.id}`}>
                <h3>{question.title}</h3>
              </Link>
              <p>{question.content}</p>
              <p>
                <strong>Category:</strong> {question.category || "General"}
              </p>
              <p>
                <strong>Hashtags:</strong>{" "}
                {question.hashtags?.join(", ") || "None"}
              </p>
            </li>
          ))
        ) : (
          <p>No questions available. Be the first to ask!</p>
        )}
      </ul>
    </div>
  );
}
