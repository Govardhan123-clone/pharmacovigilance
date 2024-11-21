"use client"
import React, { useState } from 'react';
import UserCard from '../components/UserCard/page';

const mockUsers = [
  { id: 1, name: 'Alice Johnson', location: 'USA', reputation: 320 },
  { id: 2, name: 'Bob Smith', location: 'UK', reputation: 210 },
  { id: 3, name: 'Carla Torres', location: 'Canada', reputation: 150 },
  // Add more mock users
];

const UsersPage = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Filter by user"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '20px 0',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
