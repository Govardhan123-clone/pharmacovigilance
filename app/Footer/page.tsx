// components/Footer.tsx

import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.linkContainer}>
        <Link href="/about" style={styles.footerLink}>About Us</Link>
        <Link href="/contact" style={styles.footerLink}>Contact</Link>
        <Link href="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
        <Link href="/terms-of-service" style={styles.footerLink}>Terms of Service</Link>
      </div>

      <div style={styles.socialMediaContainer}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>Twitter</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>LinkedIn</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>Facebook</a>
      </div>

      <div style={styles.copyright}>
        &copy; {new Date().getFullYear()} Pharmacovigilance Q&A. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
  footerContainer: {
    backgroundColor: '#f8f8f8',
    padding: '20px',
    textAlign: 'center' as const,
    borderTop: '1px solid #ccc',
    fontFamily: 'Arial, sans-serif',
    marginTop: '40px'
  },
  linkContainer: {
    marginBottom: '10px',
  },
  footerLink: {
    margin: '0 15px',
    textDecoration: 'none',
    color: '#0070f3',
  },
  socialMediaContainer: {
    marginBottom: '10px',
  },
  socialLink: {
    margin: '0 10px',
    color: '#0070f3',
    textDecoration: 'none',
  },
  copyright: {
    fontSize: '14px',
    color: '#666',
  },
};

export default Footer;
