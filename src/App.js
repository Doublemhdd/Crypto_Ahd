import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';

// Pages
import HomePage from './pages/HomePage';
import WalletPage from './pages/WalletPage';
import MarketPage from './pages/MarketPage';
import TransactionsPage from './pages/TransactionsPage';
import BlockchainExplorerPage from './pages/BlockchainExplorerPage';
import LearningPage from './pages/LearningPage';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const [userWallet, setUserWallet] = useState({
    id: 'ESP' + Math.floor(100000 + Math.random() * 900000), // Generate a random wallet ID with ESP prefix
    balance: 1000, // Starting with fiat currency
    cryptos: {
      bitcoin: 0,
      ethereum: 0,
      cryptoCoin: 0,
    },
    transactions: [],
    createdAt: new Date().toISOString() // Add creation date
  });

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage userWallet={userWallet} />} />
            <Route path="/wallet" element={<WalletPage userWallet={userWallet} setUserWallet={setUserWallet} />} />
            <Route path="/market" element={<MarketPage userWallet={userWallet} setUserWallet={setUserWallet} />} />
            <Route path="/transactions" element={<TransactionsPage userWallet={userWallet} />} />
            <Route path="/explorer" element={<BlockchainExplorerPage />} />
            <Route path="/learning" element={<LearningPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
