import Link from 'next/link';
import React from 'react';

const Sidebar = () => (
  <aside style={{
    width: '250px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRight: '1px solid #ddd',
  }}>
    <h2>PharmaQ&A</h2>
    <nav style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href="/" style={navLinkStyle}>Home</Link>
      <Link href="/questions" style={navLinkStyle}>Questions</Link>
      <Link href="/tags" style={navLinkStyle}>Tags</Link>
      <Link href="/users" style={navLinkStyle}>Users</Link>
      <Link href="/jobs" style={navLinkStyle}>Jobs</Link>
      <Link href="/discussions" style={navLinkStyle}>Discussions</Link>
    </nav>
  </aside>
);

const navLinkStyle = {
  margin: '10px 0',
  color: '#0070f3',
  textDecoration: 'none',
};

export default Sidebar;
