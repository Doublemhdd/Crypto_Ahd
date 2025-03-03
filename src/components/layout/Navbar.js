import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Portefeuille', path: '/wallet' },
    { name: 'Marché', path: '/market' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Explorateur Blockchain', path: '/explorer' },
    { name: 'Centre d\'Apprentissage', path: '/learning' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/" className="navbar-logo-link">
              <span className="navbar-logo-text">CryptoSimulation</span>
            </Link>
          </div>
          
          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${
                  location.pathname === link.path
                    ? 'navbar-link-active'
                    : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="navbar-mobile-button">
            <button className="navbar-mobile-icon" onClick={toggleMobileMenu}>
              <svg className="hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'show' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="navbar-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 