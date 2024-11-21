'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AskQuestionPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      // Check for non-JSON or empty response
      const data = await res.json().catch(() => {
        throw new Error('Failed to parse JSON response.');
      });

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit question.');
      }

      console.log('Question submitted successfully:', data);

      // Redirect to questions page
      router.push('/questions');
    } catch (err: any) {
      console.error('Error submitting question:', err.message);
      setError(err.message || 'There was an error submitting your question.');
    }
  };

  return (
    <div>
      <h1>Ask a Question</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block' }}>Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="content" style={{ display: 'block' }}>Content</label>
          <textarea
            id="content"
            placeholder="Describe your question"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '150px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestionPage;
