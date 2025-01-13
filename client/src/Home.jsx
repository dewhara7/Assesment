import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import homeImage from './assets/homeIm.jpg'; // Import the image

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [isHovered, setIsHovered] = useState(false); // State to handle hover effect

  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  return (
    <div style={styles.homeContainer}>
      <div style={styles.mainContent}>
        <div style={styles.textSection}>
          <h1 style={styles.heading}>Welcome to British Institute of Higher Studies</h1>
          <p style={styles.paragraph}>
            Join a community of passionate learners! Our university offers a range of
            programs to help you achieve your academic and career goals. Start your
            journey today by applying to one of our undergraduate or graduate programs and
            become a part of a transformative educational experience.
          </p>
          <div style={styles.buttonContainer}>
            <button
              style={
                isHovered
                  ? { ...styles.registerButton, ...styles.registerButtonHover }
                  : styles.registerButton
              }
              onMouseEnter={() => setIsHovered(true)} // Set hover state to true
              onMouseLeave={() => setIsHovered(false)} // Set hover state to false
              onClick={handleRegisterClick}
            >
              Register Now
            </button>
          </div>
        </div>

        <div style={styles.visualSection}>
          <img
            src={homeImage} // Use the imported image
            alt="Student Admission Illustration"
            style={styles.homeImage}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    maxWidth: '1200px',
    marginTop: '40px',
    padding: '20px',
  },
  textSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  heading: {
    fontSize: '3rem',
    fontFamily: 'Poppins, Arial, sans-serif',
    color: '#000',
    marginBottom: '20px',
    marginTop: '-10px',
    background: 'linear-gradient(to right, #2774ae, #002E5D)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '1.25rem',
    color: '#36096D',
    marginTop: '50px',
    lineHeight: '1.6',
    marginBottom: '70px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  registerButton: {
    padding: '14px 28px',
    background: 'linear-gradient(to right, #2774ae, #002E5D)',
    color: '#ffffff',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease', // Added transform transition for hover effect
    fontWeight: 'bold',
  },
  registerButtonHover: {
    background: 'linear-gradient(to right, #003D73, #004D89)', // Darker gradient on hover
    transform: 'scale(1.05)', // Slight pop effect
  },
  visualSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  },
  homeImage: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: '-75px',
  },
};

export default Home;
