// components/Login.tsx

"use client";

import { useState } from 'react';
import api from '../../../utils/api';
import { saveToken } from '../../../utils/auth';

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' },
  title: { fontSize: '24px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' },
  input: { marginBottom: '15px', padding: '8px', fontSize: '16px', width: '100%' },
  button: { padding: '10px 15px', fontSize: '16px', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' },
  message: { marginTop: '15px', fontSize: '16px', color: '#ff0000' },
};

export default function login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', form);
      saveToken(response.data.token);
      setMessage('Login successful');
    } catch (error) {
      setMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}
