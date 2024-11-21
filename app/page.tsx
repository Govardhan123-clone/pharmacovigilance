'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/questions');

        // Check for HTTP errors
        if (!res.ok) {
          const errorText = await res.text(); // Attempt to get error details
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
        }

        const data = await res.json(); // Parse JSON only if response is valid
        setQuestions(data);
      } catch (err: any) {
        console.error('Error fetching questions:', err.message);
        setError('Failed to load questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>All Questions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {questions.map((question) => (
          <li key={question.id} style={{ marginBottom: '20px' }}>
            <Link href={`/questions/${question.id}`}>
              <h3 style={{ color: '#0070f3', cursor: 'pointer' }}>{question.title}</h3>
            </Link>
            <p>{question.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
