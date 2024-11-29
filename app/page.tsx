'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('Newest');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/questions');

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
        }

        const data = await res.json();
        setQuestions(data.questions || []);
        setFilteredQuestions(data.questions || []);
      } catch (err: any) {
        console.error('Error fetching questions:', err.message);
        setError('Failed to load questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, []);

  // Handle filtering
  const applyFilter = (filterType: string) => {
    setFilter(filterType);
    let filtered = [...questions];

    switch (filterType) {
      case 'Newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'Active':
        filtered.sort((a, b) => b.answers.length - a.answers.length);
        break;
      case 'Answered':
        filtered = filtered.filter((q) => q.answers.length > 0);
        break;
      case 'Unanswered':
        filtered = filtered.filter((q) => q.answers.length === 0);
        break;
      case 'Popular':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      default:
        break;
    }
    setFilteredQuestions(filtered);
  };

  return (
    <div>
      <h1>Pharmacovigilance Forum</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Filter Options */}
      <div style={{ marginBottom: '20px' }}>
        <strong>Filters:</strong>
        {['Newest', 'Active', 'Answered', 'Unanswered', 'Popular'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => applyFilter(filterType)}
            style={{
              margin: '5px',
              padding: '5px 10px',
              backgroundColor: filter === filterType ? '#0070f3' : '#f0f0f0',
              color: filter === filterType ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <li
              key={question.id}
              style={{
                marginBottom: '20px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <Link href={`/questions/${question.id}`}>
                <h3 style={{ color: '#0070f3', cursor: 'pointer' }}>{question.title}</h3>
              </Link>
              <p>
                <strong>Category:</strong> {question.category}
              </p>
              <p>
                <strong>Hashtags:</strong>{' '}
                {question.hashtags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#e0f7fa',
                      padding: '3px 7px',
                      borderRadius: '3px',
                      margin: '0 5px',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </p>
              <p>{question.content.slice(0, 100)}...</p>
              <p>
                <strong>Answers:</strong> {question.answers.length}
              </p>
            </li>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
