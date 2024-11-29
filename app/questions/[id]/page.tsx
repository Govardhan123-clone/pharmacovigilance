"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function QuestionDetails() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerContent, setAnswerContent] = useState("");
  const { id } = useParams(); // Get dynamic route parameter `id`

  // Fetch the question and its answers
  useEffect(() => {
    if (id) {
      const fetchQuestion = async () => {
        try {
          const res = await fetch(`/api/questions/${id}`);
          const data = await res.json();
          if (res.ok) {
            setQuestion(data);
          } else {
            console.error("Error fetching question:", data.error);
          }
        } catch (err) {
          console.error("Error fetching question:", err);
        }
      };

      const fetchAnswers = async () => {
        try {
          const res = await fetch(`/api/answers?questionId=${id}`);
          const data = await res.json();
          if (res.ok) {
            setAnswers(data.answers);
          } else {
            console.error("Error fetching answers:", data.error);
          }
        } catch (err) {
          console.error("Error fetching answers:", err);
        }
      };

      fetchQuestion();
      fetchAnswers();
    }
  }, [id]);

  // Submit a new answer
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: answerContent, userId: 1, questionId: parseInt(id) }),
      });

      if (res.ok) {
        const newAnswer = await res.json();
        setAnswers((prev) => [...prev, newAnswer.answer]);
        setAnswerContent(""); // Reset input field
      } else {
        console.error("Error submitting answer:", await res.json());
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  // Handle voting for both question and answers
  const handleVote = async (voteType: "UP" | "DOWN", answerId?: number) => {
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // Replace with logged-in user ID
          questionId: answerId ? undefined : id,
          answerId: answerId || undefined,
          voteType,
        }),
      });

      if (res.ok) {
        console.log("Vote submitted successfully");
      } else {
        console.error("Error submitting vote:", await res.json());
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  // If question data is not loaded yet, show a loading state
  if (!question) return <div>Loading...</div>;

  return (
    <div>
      {/* Question Details */}
      <h1>{question.title}</h1>
      <p>{question.content}</p>

      {/* Voting for Question */}
      <div>
        <button onClick={() => handleVote("UP")}>Upvote Question</button>
        <button onClick={() => handleVote("DOWN")}>Downvote Question</button>
      </div>

      {/* Answers Section */}
      <h2>Answers</h2>
      <ul>
        {answers.map((answer) => (
          <li key={answer.id}>
            {answer.content}
            <div>
              <button onClick={() => handleVote("UP", answer.id)}>Upvote</button>
              <button onClick={() => handleVote("DOWN", answer.id)}>Downvote</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Submit New Answer */}
      <form onSubmit={handleAnswerSubmit}>
        <textarea
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
          placeholder="Write your answer here"
          required
        />
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
}
