// app/lib/api.ts
export async function fetchQuestions() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questions`, {
      method: "GET",
      cache: "no-store", // Ensures fresh data
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.questions;
  }
  