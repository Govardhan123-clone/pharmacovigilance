import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Send Reset Email</button>
    </form>
  );
}
