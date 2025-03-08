import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} CryptoSimulation - Projet Éducatif
            </p>
            <p className="footer-disclaimer">
              Ceci est une simulation simplifiée à des fins éducatives uniquement
            </p>
          </div>
          <div className="footer-social">
            <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <span className="sr-only">Binance</span>
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="footer-link-text">Binance</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 