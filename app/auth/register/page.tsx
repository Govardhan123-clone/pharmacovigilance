"use client";

import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    company: "",
    experienceLevel: "",
    expertiseAreas: [] as string[], // Type expertiseAreas as an array of strings
  });

  const [message, setMessage] = useState("");

  const expertiseOptions = [
    "PV Case Management",
    "Writing aggregate safety reports",
    "Signal management",
    "Risk Management",
    "Benefit Risk Assessment",
    "Audits & Inspections in PV",
    "PV Agreements",
    "PSMF",
    "Quality Management",
    "Others",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm((prevForm) => {
      const updatedExpertise = checked
        ? [...prevForm.expertiseAreas, value]
        : prevForm.expertiseAreas.filter((area) => area !== value);

      return {
        ...prevForm,
        expertiseAreas: updatedExpertise,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that all required fields are filled
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.country ||
      !form.experienceLevel ||
      form.expertiseAreas.length === 0
    ) {
      setMessage("All fields are required, and at least one expertise area must be selected.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Registration successful!");
        setForm({
          name: "",
          email: "",
          password: "",
          country: "",
          company: "",
          experienceLevel: "",
          expertiseAreas: [],
        });
      } else {
        const data = await response.json();
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company (Optional):</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Experience Level:</label>
          <select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select experience level</option>
            <option value="Novice">Novice</option>
            <option value="AdvancedBeginner">Advanced Beginner</option>
            <option value="Competent">Competent</option>
            <option value="Proficient">Proficient</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <label>Areas of Expertise:</label>
          {expertiseOptions.map((option, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={option}
                checked={form.expertiseAreas.includes(option)}
                onChange={handleCheckboxChange}
              />
              {option}
            </label>
          ))}
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
        }
        h1 {
          text-align: center;
          color: #333;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        div {
          margin-bottom: 10px;
        }
        label {
          font-weight: bold;
          margin-bottom: 5px;
        }
        input,
        select,
        button {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        p {
          text-align: center;
          color: #333;
          font-size: 14px;
          font-weight: bold;
        }
        label input {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}
