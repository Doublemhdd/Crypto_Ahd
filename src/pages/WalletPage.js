import React, { useState } from 'react';
import './WalletPage.css';

const WalletPage = ({ userWallet, setUserWallet }) => {
  const [transferAmount, setTransferAmount] = useState('');
  const [transferType, setTransferType] = useState('deposit');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Simulated crypto prices
  const cryptoPrices = {
    bitcoin: 45000,
    ethereum: 3000,
    cryptoCoin: 100
  };

  // Calculate total portfolio value
  const calculatePortfolioValue = () => {
    const cryptoValue = 
      (userWallet.cryptos.bitcoin * cryptoPrices.bitcoin) +
      (userWallet.cryptos.ethereum * cryptoPrices.ethereum) +
      (userWallet.cryptos.cryptoCoin * cryptoPrices.cryptoCoin);
    
    return userWallet.balance + cryptoValue;
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Veuillez saisir un montant valide.');
      setSuccessMessage('');
      return;
    }

    if (transferType === 'withdraw' && amount > userWallet.balance) {
      setErrorMessage('Fonds insuffisants pour le retrait.');
      setSuccessMessage('');
      return;
    }

    // Create transaction record
    const newTransaction = {
      id: Date.now(),
      type: transferType,
      amount: amount,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    // Update wallet balance
    const updatedWallet = { ...userWallet };
    if (transferType === 'deposit') {
      updatedWallet.balance += amount;
      setSuccessMessage(`Dépôt de €${amount.toFixed(2)} effectué avec succès.`);
    } else {
      updatedWallet.balance -= amount;
      setSuccessMessage(`Retrait de €${amount.toFixed(2)} effectué avec succès.`);
    }

    // Add transaction to history
    updatedWallet.transactions = [newTransaction, ...updatedWallet.transactions];
    
    // Update wallet state
    setUserWallet(updatedWallet);
    setTransferAmount('');
    setErrorMessage('');
  };

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">Portefeuille</h1>
      
      <div className="wallet-summary">
        <h2>Résumé du Portefeuille</h2>
        <p>Valeur Totale Estimée: <strong>€{calculatePortfolioValue().toFixed(2)}</strong></p>
      </div>
      
      <div className="wallet-grid">
        <div className="wallet-card wallet-balance-card">
          <h3 className="wallet-card-title">Solde en Monnaie Fiduciaire</h3>
          <p className="wallet-balance-amount">€{userWallet.balance.toFixed(2)}</p>
          <p className="wallet-card-subtitle">Disponible pour les transactions</p>
        </div>
        
        <div className="wallet-card wallet-portfolio-card">
          <h3 className="wallet-card-title">Vos Actifs Crypto</h3>
          <div>
            <p>
              <span>Bitcoin: </span>
              <span className="wallet-crypto-amount">{userWallet.cryptos.bitcoin} BTC</span>
              <span className="wallet-card-subtitle"> (€{(userWallet.cryptos.bitcoin * cryptoPrices.bitcoin).toFixed(2)})</span>
            </p>
            <p>
              <span>Ethereum: </span>
              <span className="wallet-crypto-amount">{userWallet.cryptos.ethereum} ETH</span>
              <span className="wallet-card-subtitle"> (€{(userWallet.cryptos.ethereum * cryptoPrices.ethereum).toFixed(2)})</span>
            </p>
            <p>
              <span>CryptoCoin: </span>
              <span className="wallet-crypto-amount">{userWallet.cryptos.cryptoCoin} CRC</span>
              <span className="wallet-card-subtitle"> (€{(userWallet.cryptos.cryptoCoin * cryptoPrices.cryptoCoin).toFixed(2)})</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="wallet-actions-grid">
        <div className="wallet-action-card">
          <h3 className="wallet-section-title">Dépôt et Retrait</h3>
          
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="success-message">
              <p>{successMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleTransfer}>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="transferType"
                  value="deposit"
                  checked={transferType === 'deposit'}
                  onChange={() => setTransferType('deposit')}
                />
                <span className="radio-text">Dépôt</span>
              </label>
              
              <label className="radio-label">
                <input
                  type="radio"
                  name="transferType"
                  value="withdraw"
                  checked={transferType === 'withdraw'}
                  onChange={() => setTransferType('withdraw')}
                />
                <span className="radio-text">Retrait</span>
              </label>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Montant (€)
              </label>
              <input
                type="number"
                className="form-input"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Saisir le montant"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              {transferType === 'deposit' ? 'Déposer des Fonds' : 'Retirer des Fonds'}
            </button>
          </form>
        </div>
        
        <div className="wallet-action-card">
          <h3 className="wallet-section-title">Informations sur le Portefeuille</h3>
          
          <div className="info-section">
            <div className="info-item">
              <span className="info-title">Identifiant du Portefeuille:</span>
              <span className="info-text">{userWallet.id || 'ESP-Wallet'}</span>
            </div>
            
            <div className="info-item">
              <span className="info-title">Créé le:</span>
              <span className="info-text">
                {userWallet.createdAt 
                  ? new Date(userWallet.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                  : 'Non disponible'}
              </span>
            </div>
            
            <div className="info-item">
              <span className="info-title">Transactions Totales:</span>
              <span className="info-text">{userWallet.transactions.length}</span>
            </div>
            
            <div className="info-item">
              <span className="info-title">Dernière Activité:</span>
              <span className="info-text">
                {userWallet.transactions.length > 0
                  ? new Date(userWallet.transactions[0].timestamp).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Aucune transaction'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage; 