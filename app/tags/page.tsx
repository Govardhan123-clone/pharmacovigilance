'use client';

import { useEffect, useState } from 'react';

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags');
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setTags(data);
      } catch (err: any) {
        console.error('Error fetching tags:', err.message);
        setError('Failed to load tags. Please try again later.');
      }
    };

    fetchTags();
  }, []);

  return (
    <div>
      <h1>Tags</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {tags.map((tag) => (
          <li key={tag.id} style={{ marginBottom: '20px' }}>
            <h3>{tag.name}</h3>
            <p>{tag.description || 'No description available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsPage;
