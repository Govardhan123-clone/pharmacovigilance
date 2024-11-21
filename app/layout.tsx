import Link from 'next/link';
import React from 'react';
import Footer from './Footer/page';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div style={styles.container}>
          {/* Top Navbar */}
          <header style={styles.topNavbar}>
            <div style={styles.navContent}>
              <Link href="/" style={styles.logo}>
                PharmaQ&A
              </Link>
              <div style={styles.navLinks}>
                <Link href="/about" style={styles.navLink}>About</Link>
                <Link href="/products" style={styles.navLink}>Products</Link>
                <Link href="/overflowai" style={styles.navLink}>OverflowAI</Link>
              </div>
              <input
                type="text"
                placeholder="Search..."
                style={styles.searchBar}
              />
              <div style={styles.authLinks}>
                <Link href="/auth/login" style={styles.navLink}>Log in</Link>
                <Link href="/auth/register">
                  <button style={styles.signUpButton}>Sign up</button>
                </Link>
              </div>
            </div>
          </header>

          {/* Sidebar */}
          <aside style={styles.sidebar}>
            <nav style={styles.sidebarNav}>
              <Link href="/" style={styles.sidebarLink}>Home</Link>
              <Link href="/questions" style={styles.sidebarLink}>Questions</Link>
              <Link href="/questions/create" style={styles.askQuestionLink}>
                Ask Question
              </Link>
              <Link href="/tags" style={styles.sidebarLink}>Tags</Link>
              <Link href="/users" style={styles.sidebarLink}>Users</Link>
              <Link href="/companies" style={styles.sidebarLink}>Companies</Link>
              <Link href="/jobs" style={styles.sidebarLink}>Jobs</Link>
              <Link href="/discussions" style={styles.sidebarLink}>Discussions</Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div style={styles.mainContent}>
            {/* Hero Section */}
            <section style={styles.heroSection}>
              <h1 style={styles.heroTitle}>Every pharmacovigilance professional has a tab open to PharmaQ&A.</h1>
              <p style={styles.heroDescription}>
                Your go-to platform for questions, learning, and sharing knowledge on pharmacovigilance.
              </p>
              <div style={styles.heroButtons}>
                <Link href="/auth/register">
                  <button style={styles.buttonPrimary}>Sign Up</button>
                </Link>
                <Link href="/community">
                  <button style={styles.buttonSecondary}>Visit the community</button>
                </Link>
              </div>
            </section>

            {/* Main Content */}
            <main style={styles.content}>
              {children}
            </main>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
};

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    backgroundColor: '#fff', // Adding background to body for clarity
  },
  topNavbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f7f7f8',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
  },
  logo: {
    fontSize: '1.5em',
    color: '#0070f3',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginRight: '20px',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
    marginLeft: '20px',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '1em',
    transition: 'color 0.3s',
  },
  searchBar: {
    flexGrow: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginLeft: '20px',
  },
  authLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginLeft: '20px',
  },
  signUpButton: {
    padding: '5px 10px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'sticky',
    top: '70px', // Sticky Sidebar
    width: '250px',
    backgroundColor: '#f7f7f8',
    padding: '20px',
    borderRight: '1px solid #ddd',
    zIndex: 1000,
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  sidebarLink: {
    color: '#333',
    textDecoration: 'none',
    padding: '8px 10px',
    transition: 'background-color 0.3s',
  },
  askQuestionLink: {
    background: '#0070f3',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    textAlign: 'center' as const,
    textDecoration: 'none',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    marginLeft: '250px', // Offset to align with sidebar width
  },
  heroSection: {
    padding: '40px',
    backgroundColor: '#f0f4f8',
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '2em',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  heroDescription: {
    fontSize: '1.1em',
    color: '#555',
    marginBottom: '20px',
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  buttonPrimary: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonSecondary: {
    padding: '10px 20px',
    backgroundColor: '#f1f1f1',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  content: {
    padding: '20px 0',
  },

  // Mobile responsive styles
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column' as const,
    },
    sidebar: {
      width: '100%',
      padding: '10px',
      position: 'relative', // Sidebar moves under content
      top: 'auto',
    },
    mainContent: {
      marginLeft: 0,
    },
    topNavbar: {
      flexDirection: 'column',
      padding: '15px',
    },
    navLinks: {
      marginTop: '10px',
      gap: '10px',
    },
    signUpButton: {
      padding: '10px 15px', // Adjust button size for mobile
    },
    searchBar: {
      width: '80%', // Adjust search bar width
    },
  },
};

export default Layout;
