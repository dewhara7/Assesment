import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navItems}>
        <Link
          to="/"
          style={styles.navItem}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Home
        </Link>
        <Link
          to="/register"
          style={styles.navItem}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Register
        </Link>
        <Link
          to="/admission"
          style={styles.navItem}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Admission
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '100%',
    fontFamily: 'Poppins, Arial, sans-serif',
    background: 'linear-gradient(to right, #2774ae, #002E5D)',
    padding: '20px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
  },
  navItems: {
    display: 'flex',
    gap: '40px',
  },
  navItem: {
    color: '#ffffff',
    fontSize: '1rem',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease, color 0.3s ease',
  },
};

export default Navbar;
