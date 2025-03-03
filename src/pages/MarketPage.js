import React, { useState, useEffect } from 'react';
import './MarketPage.css';

const MarketPage = ({ userWallet, setUserWallet }) => {
  // Simulated crypto data
  const [cryptos, setCryptos] = useState([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 45000,
      change24h: 2.5,
      marketCap: 850000000000,
      volume24h: 28000000000,
      supply: 19000000,
      icon: '₿'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3000,
      change24h: -1.2,
      marketCap: 350000000000,
      volume24h: 15000000000,
      supply: 120000000,
      icon: 'Ξ'
    },
    {
      id: 'cryptoCoin',
      name: 'CryptoCoin',
      symbol: 'CRC',
      price: 100,
      change24h: 5.8,
      marketCap: 10000000000,
      volume24h: 500000000,
      supply: 100000000,
      icon: '©'
    }
  ]);

  // Trade form state
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Simulated price change
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptos(prevCryptos => 
        prevCryptos.map(crypto => {
          const changePercent = (Math.random() * 2 - 1) * 0.5; // Between -0.5% and 0.5%
          const newPrice = crypto.price * (1 + changePercent / 100);
          return {
            ...crypto,
            price: parseFloat(newPrice.toFixed(2)),
            change24h: parseFloat((crypto.change24h + changePercent / 10).toFixed(2)),
          };
        })
      );
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleTrade = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Veuillez saisir un montant valide.');
      setSuccessMessage('');
      return;
    }
    
    const crypto = cryptos.find(c => c.id === selectedCrypto);
    
    if (tradeType === 'buy') {
      const cost = parsedAmount * crypto.price;
      
      if (cost > userWallet.balance) {
        setErrorMessage(`Fonds insuffisants. Coût total: €${cost.toFixed(2)}`);
        setSuccessMessage('');
        return;
      }
      
      // Create transaction record
      const newTransaction = {
        id: Date.now(),
        type: 'buy',
        crypto: crypto.id,
        amount: parsedAmount,
        price: crypto.price,
        total: cost,
        timestamp: new Date().toISOString(),
        status: 'completed',
      };
      
      // Update wallet
      const updatedWallet = { ...userWallet };
      updatedWallet.balance -= cost;
      updatedWallet.cryptos[crypto.id] += parsedAmount;
      updatedWallet.transactions = [newTransaction, ...updatedWallet.transactions];
      
      setUserWallet(updatedWallet);
      setAmount('');
      setErrorMessage('');
      setSuccessMessage(`Achat réussi de ${parsedAmount} ${crypto.symbol} pour €${cost.toFixed(2)}`);
    }
    
    if (tradeType === 'sell') {
      if (parsedAmount > userWallet.cryptos[crypto.id]) {
        setErrorMessage(`Crypto insuffisante. Vous avez ${userWallet.cryptos[crypto.id]} ${crypto.symbol}.`);
        setSuccessMessage('');
        return;
      }
      
      const revenue = parsedAmount * crypto.price;
      
      // Create transaction record
      const newTransaction = {
        id: Date.now(),
        type: 'sell',
        crypto: crypto.id,
        amount: parsedAmount,
        price: crypto.price,
        total: revenue,
        timestamp: new Date().toISOString(),
        status: 'completed',
      };
      
      // Update wallet
      const updatedWallet = { ...userWallet };
      updatedWallet.balance += revenue;
      updatedWallet.cryptos[crypto.id] -= parsedAmount;
      updatedWallet.transactions = [newTransaction, ...updatedWallet.transactions];
      
      setUserWallet(updatedWallet);
      setAmount('');
      setErrorMessage('');
      setSuccessMessage(`Vente réussie de ${parsedAmount} ${crypto.symbol} pour €${revenue.toFixed(2)}`);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return `€${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `€${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `€${(num / 1000).toFixed(1)}K`;
    }
    return `€${num.toFixed(2)}`;
  };

  return (
    <div className="market-container">
      <h1 className="market-title">Marché Crypto</h1>
      
      <div className="wallet-summary-grid">
        <div className="wallet-summary-card">
          <h2 className="card-title">Solde Disponible</h2>
          <p className="balance-amount">€{userWallet.balance.toFixed(2)}</p>
        </div>
        
        <div className="wallet-summary-card">
          <h2 className="card-title">Bitcoin</h2>
          <p className="crypto-amount">{userWallet.cryptos.bitcoin} BTC</p>
          <p className="crypto-value">€{(userWallet.cryptos.bitcoin * cryptos.find(c => c.id === 'bitcoin').price).toFixed(2)}</p>
        </div>
        
        <div className="wallet-summary-card">
          <h2 className="card-title">Ethereum</h2>
          <p className="crypto-amount">{userWallet.cryptos.ethereum} ETH</p>
          <p className="crypto-value">€{(userWallet.cryptos.ethereum * cryptos.find(c => c.id === 'ethereum').price).toFixed(2)}</p>
        </div>
        
        <div className="wallet-summary-card">
          <h2 className="card-title">CryptoCoin</h2>
          <p className="crypto-amount">{userWallet.cryptos.cryptoCoin} CRC</p>
          <p className="crypto-value">€{(userWallet.cryptos.cryptoCoin * cryptos.find(c => c.id === 'cryptoCoin').price).toFixed(2)}</p>
        </div>
      </div>
      
      <div className="market-content-grid">
        <div className="market-card">
          <div className="market-card-header">
            <h2 className="market-card-title">Marché des Cryptomonnaies</h2>
          </div>
          
          <div className="table-container">
            <table className="market-table">
              <thead className="table-header">
                <tr>
                  <th className="table-heading text-left">Crypto</th>
                  <th className="table-heading text-right">Prix</th>
                  <th className="table-heading text-right">Évolution 24h</th>
                  <th className="table-heading text-right">Cap. Marché</th>
                  <th className="table-heading text-right">Volume 24h</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {cryptos.map(crypto => (
                  <tr key={crypto.id} className="table-row">
                    <td className="table-cell crypto-cell">
                      <div className="crypto-icon">{crypto.icon}</div>
                      <div className="crypto-name-container">
                        <div className="crypto-name">{crypto.name}</div>
                        <div className="crypto-symbol">{crypto.symbol}</div>
                      </div>
                    </td>
                    <td className="table-cell text-right">
                      €{crypto.price.toFixed(2)}
                    </td>
                    <td className={`table-cell text-right ${crypto.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
                      {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                    </td>
                    <td className="table-cell text-right">
                      {formatNumber(crypto.marketCap)}
                    </td>
                    <td className="table-cell text-right">
                      {formatNumber(crypto.volume24h)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="trade-section">
          <div className="trade-card">
            <h2 className="trade-card-title">Acheter / Vendre</h2>
            
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
            
            <form className="trade-form" onSubmit={handleTrade}>
              <div className="form-group">
                <label className="form-label">Cryptomonnaie</label>
                <select 
                  className="form-select"
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                >
                  {cryptos.map(crypto => (
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Type de Transaction</label>
                <div>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tradeType"
                      value="buy"
                      checked={tradeType === 'buy'}
                      onChange={() => setTradeType('buy')}
                    />
                    <span>Acheter</span>
                  </label>
                  
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tradeType"
                      value="sell"
                      checked={tradeType === 'sell'}
                      onChange={() => setTradeType('sell')}
                    />
                    <span>Vendre</span>
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  Quantité en {cryptos.find(c => c.id === selectedCrypto).symbol}
                  <span className="label-hint">
                    (Prix actuel: €{cryptos.find(c => c.id === selectedCrypto).price.toFixed(2)})
                  </span>
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Entrez la quantité"
                  min="0.00001"
                  step="0.00001"
                />
              </div>
              
              {amount && (
                <div className="price-preview">
                  <p>
                    Total estimé: €
                    {(parseFloat(amount || 0) * cryptos.find(c => c.id === selectedCrypto).price).toFixed(2)}
                  </p>
                </div>
              )}
              
              <button type="submit" className="btn btn-primary">
                {tradeType === 'buy' ? 'Acheter maintenant' : 'Vendre maintenant'}
              </button>
            </form>
          </div>
          
          <div className="trade-info-card">
            <h2 className="trade-info-title">Guide de Trading</h2>
            
            <div className="info-text">
              <p>Notre plateforme de simulation vous permet d'expérimenter l'achat et la vente de cryptomonnaies sans risquer de vrais fonds.</p>
            </div>
            
            <ul className="info-list">
              <li>Choisissez la cryptomonnaie que vous souhaitez négocier</li>
              <li>Sélectionnez "Acheter" ou "Vendre" selon votre intention</li>
              <li>Entrez la quantité de crypto que vous souhaitez négocier</li>
              <li>Vérifiez le coût total ou le revenu attendu</li>
              <li>Confirmez votre transaction</li>
            </ul>
            
            <div className="info-text">
              <p>Les prix sont simulés et fluctuent périodiquement pour imiter les variations réelles du marché.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage; 