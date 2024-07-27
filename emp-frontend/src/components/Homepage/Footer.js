import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>ClassroomApp</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Community</h3>
          <ul>
            <li><a href="/teachers">Teachers</a></li>
            <li><a href="/students">Students</a></li>
            <li><a href="/parents">Parents</a></li>
            <li><a href="/partners">Partners</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>More</h3>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow Us</h3>
          <ul className="social-list">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/images/fb.jpg" alt="Facebook" /> Facebook
            </a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/images/linkedin.jpg" alt="LinkedIn" /> LinkedIn
            </a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src="/images/thread.jpg" alt="Twitter" /> Twitter
            </a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/images/insta.jpg" alt="Instagram" /> Instagram
            </a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 ClassroomApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


