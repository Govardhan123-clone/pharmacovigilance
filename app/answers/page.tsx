"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AnswerQuestionPage() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = searchParams.get("id");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }
        const data = await response.json();
        setQuestion(data.question);
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Unable to load the question.");
      }
    };
    if (questionId) fetchQuestion();
  }, [questionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`/api/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: answer, questionId: parseInt(questionId), userId: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit answer.");
      }

      setSuccess(true);
      setAnswer("");
      setTimeout(() => router.push(`/questions/${questionId}`), 1500);
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Answer submitted successfully!</p>}

      {question ? (
        <>
          <h1>{question.title}</h1>
          <p>{question.content}</p>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              style={{ width: "100%", height: "150px", marginBottom: "20px", padding: "10px" }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit Answer
            </button>
          </form>
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}
