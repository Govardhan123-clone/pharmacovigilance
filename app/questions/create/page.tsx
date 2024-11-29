"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateQuestion() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    userId: 1, // Default user ID, replace with actual user data if available
    tags: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        // Handle cases where the response JSON might be empty or invalid
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: "An unknown error occurred" };
        }
        setError(errorData.error || "Failed to create question.");
        console.error("Error creating question:", errorData);
        return;
      }

      const data = await response.json(); // Parse response JSON if successful
      console.log("Question created successfully:", data);
      setSuccess(true);

      // Redirect to questions page after a delay to allow the success message to show
      setTimeout(() => {
        router.push("/questions");
      }, 1500);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Create a New Question</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Question created successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="title">Question Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your question title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="content">Question Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Provide detailed content for your question"
            value={form.content}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              height: "150px",
            }}
          />
        </div>

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
          Submit
        </button>
      </form>
    </div>
  );
}
