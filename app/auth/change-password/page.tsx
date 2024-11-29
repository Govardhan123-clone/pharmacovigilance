"use client";

import React, { useState } from "react";

export default function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          required
        />
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
