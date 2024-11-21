import React from 'react';

interface User {
  id: number;
  name: string;
  location: string;
  reputation: number;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <div style={userCardStyle}>
    <h3>{user.name}</h3>
    <p>Location: {user.location}</p>
    <p>Reputation: {user.reputation}</p>
  </div>
);

const userCardStyle = {
  width: '200px',
  padding: '10px',
  margin: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  textAlign: 'center' as const,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default UserCard;
