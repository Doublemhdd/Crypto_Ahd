import React, { useState } from 'react';
import './TransactionsPage.css';

const TransactionsPage = ({ userWallet }) => {
  const [filter, setFilter] = useState('all');
  
  // Filter transactions based on selected filter
  const filteredTransactions = userWallet.transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  // Get transaction type badge color
  const getTransactionBadge = (type) => {
    switch (type) {
      case 'buy':
        return <span className="badge badge-buy">Achat</span>;
      case 'sell':
        return <span className="badge badge-sell">Vente</span>;
      case 'deposit':
        return <span className="badge badge-deposit">Dépôt</span>;
      case 'withdraw':
        return <span className="badge badge-withdraw">Retrait</span>;
      default:
        return <span className="badge badge-default">{type}</span>;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR');
  };

  return (
    <div className="transactions-container">
      <h1 className="transactions-title">Historique des Transactions</h1>
      
      <div className="transactions-card">
        <div className="transactions-header">
          <h2 className="transactions-header-title">Vos Transactions</h2>
          
          <div className="filter-buttons">
            <button 
              className={`filter-button ${filter === 'all' ? 'filter-button-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Toutes
            </button>
            <button 
              className={`filter-button ${filter === 'buy' ? 'filter-button-active' : ''}`}
              onClick={() => setFilter('buy')}
            >
              Achats
            </button>
            <button 
              className={`filter-button ${filter === 'sell' ? 'filter-button-active' : ''}`}
              onClick={() => setFilter('sell')}
            >
              Ventes
            </button>
            <button 
              className={`filter-button ${filter === 'deposit' ? 'filter-button-active' : ''}`}
              onClick={() => setFilter('deposit')}
            >
              Dépôts
            </button>
            <button 
              className={`filter-button ${filter === 'withdraw' ? 'filter-button-active' : ''}`}
              onClick={() => setFilter('withdraw')}
            >
              Retraits
            </button>
          </div>
        </div>
        
        {filteredTransactions.length === 0 ? (
          <div className="no-transactions">
            <p>Aucune transaction trouvée.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="transactions-table">
              <thead className="table-header">
                <tr>
                  <th className="table-heading text-left">
                    Date et Heure
                  </th>
                  <th className="table-heading text-left">
                    Type
                  </th>
                  <th className="table-heading text-left">
                    Détails
                  </th>
                  <th className="table-heading text-right">
                    Montant
                  </th>
                  <th className="table-heading text-right">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="table-row">
                    <td className="table-cell">
                      {formatDate(transaction.timestamp)}
                    </td>
                    <td className="table-cell">
                      {getTransactionBadge(transaction.type)}
                    </td>
                    <td className="table-cell">
                      {transaction.type === 'buy' || transaction.type === 'sell' ? (
                        <div>
                          <div className="transaction-crypto">
                            {transaction.amount} {transaction.crypto.toUpperCase()}
                          </div>
                          <div className="transaction-price">
                            Prix: €{transaction.price} par unité
                          </div>
                        </div>
                      ) : (
                        <div className="transaction-type">
                          {transaction.type === 'deposit' ? 'Dépôt de fonds' : 'Retrait de fonds'}
                        </div>
                      )}
                    </td>
                    <td className="table-cell text-right">
                      {transaction.type === 'buy' || transaction.type === 'withdraw' ? (
                        <span className="amount-negative">-€{transaction.total || transaction.amount}</span>
                      ) : (
                        <span className="amount-positive">+€{transaction.total || transaction.amount}</span>
                      )}
                    </td>
                    <td className="table-cell text-right">
                      <span className="status-badge">
                        {transaction.status === 'completed' ? 'Terminé' : transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="info-section">
        <h2 className="info-title">Comprendre les Transactions Blockchain</h2>
        
        <div className="info-content">
          <p className="info-text">
            Dans une blockchain réelle, les transactions sont regroupées en blocs et ajoutées à une chaîne de blocs précédents, 
            créant ainsi un registre immuable. Chaque transaction est vérifiée par les participants du réseau (mineurs ou validateurs) 
            avant d'être ajoutée à la blockchain.
          </p>
          
          <div className="key-concepts">
            <h3 className="key-concepts-title">Concepts Clés des Transactions:</h3>
            <ul className="concepts-list">
              <li>
                <span className="concept-name">Immuabilité:</span> Une fois enregistrées sur la blockchain, les transactions ne peuvent être ni modifiées ni supprimées.
              </li>
              <li>
                <span className="concept-name">Transparence:</span> Toutes les transactions sont visibles publiquement sur la blockchain.
              </li>
              <li>
                <span className="concept-name">Confirmation:</span> Les transactions doivent être confirmées par le réseau avant d'être considérées comme définitives.
              </li>
              <li>
                <span className="concept-name">Frais de Transaction:</span> Les utilisateurs paient des frais pour inciter les mineurs/validateurs à traiter leurs transactions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage; 