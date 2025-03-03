import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// Try to import the logo from different possible locations
let espLogo;
try {
  espLogo = require('../assets/esp.jpg');
} catch (e) {
  try {
    espLogo = require('../esp.jpg');
  } catch (e) {
    espLogo = null;
  }
}

const HomePage = ({ userWallet }) => {
  return (
    <div className="home-container">
      {espLogo && (
        <div className="home-logo-container">
          <img src={espLogo} alt="École Supérieure Polytechnique" className="home-logo" />
          <p className="logo-caption">École Supérieure Polytechnique</p>
        </div>
      )}
      <div className="home-card">
        <h1 className="home-title">
          Bienvenue à CryptoSimulation
        </h1>
        
        <div className="home-intro-section">
          <div className="home-intro-banner">
            <p className="home-intro-text">
              Explorez le monde de la cryptomonnaie dans cette simulation éducative.
              Apprenez comment la blockchain, les portefeuilles et les transactions fonctionnent dans un environnement simplifié.
            </p>
          </div>
          
          <div className="home-stats-grid">
            <div className="home-stats-card">
              <h3 className="home-stats-title">
                Votre Solde
              </h3>
              <p className="home-stats-balance">
                €{userWallet.balance.toFixed(2)}
              </p>
              <p className="home-stats-subtitle">
                Monnaie Fiduciaire
              </p>
              <Link to="/wallet" className="btn btn-primary home-stats-action">
                Gérer le Portefeuille
              </Link>
            </div>
            
            <div className="home-stats-card">
              <h3 className="home-stats-title">
                Vos Cryptomonnaies
              </h3>
              <ul className="home-crypto-list">
                <li className="home-crypto-item">
                  <span>Bitcoin:</span>
                  <span className="home-crypto-amount">{userWallet.cryptos.bitcoin} BTC</span>
                </li>
                <li className="home-crypto-item">
                  <span>Ethereum:</span>
                  <span className="home-crypto-amount">{userWallet.cryptos.ethereum} ETH</span>
                </li>
                <li className="home-crypto-item">
                  <span>CryptoCoin:</span>
                  <span className="home-crypto-amount">{userWallet.cryptos.cryptoCoin} CRC</span>
                </li>
              </ul>
              <Link to="/market" className="btn btn-primary home-stats-action">
                Accéder au Marché
              </Link>
            </div>
          </div>
        </div>
        
        <div className="home-features-grid">
          <Link to="/learning" className="home-feature-card">
            <h3 className="home-feature-title">Centre d'Apprentissage</h3>
            <p className="home-feature-description">
              Explorez les concepts fondamentaux de la cryptomonnaie et de la blockchain.
            </p>
          </Link>
          
          <Link to="/market" className="home-feature-card">
            <h3 className="home-feature-title">Marché</h3>
            <p className="home-feature-description">
              Achetez et vendez des cryptomonnaies avec votre monnaie virtuelle.
            </p>
          </Link>
          
          <Link to="/wallet" className="home-feature-card">
            <h3 className="home-feature-title">Portefeuille</h3>
            <p className="home-feature-description">
              Gérez vos actifs et effectuez des transferts entre comptes.
            </p>
          </Link>
          
          <Link to="/explorer" className="home-feature-card">
            <h3 className="home-feature-title">Explorateur Blockchain</h3>
            <p className="home-feature-description">
              Visualisez les transactions et les blocs dans la chaîne simulée.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 