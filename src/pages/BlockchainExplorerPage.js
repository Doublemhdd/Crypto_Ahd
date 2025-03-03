import React, { useState, useEffect } from 'react';
import './BlockchainExplorerPage.css';

const BlockchainExplorerPage = () => {
  // Simulated blockchain data
  const [blockchain, setBlockchain] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate simulated blockchain data
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const generatedBlocks = generateBlockchain(10);
      setBlockchain(generatedBlocks);
      setSelectedBlock(generatedBlocks[0]);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Function to generate simulated blockchain data
  const generateBlockchain = (numBlocks) => {
    const blocks = [];
    let previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
    
    for (let i = 0; i < numBlocks; i++) {
      const timestamp = new Date(Date.now() - (numBlocks - i) * 600000).toISOString();
      const nonce = Math.floor(Math.random() * 1000000);
      const difficulty = 4;
      
      // Generate random transactions
      const numTransactions = Math.floor(Math.random() * 5) + 1;
      const transactions = [];
      
      for (let j = 0; j < numTransactions; j++) {
        const transactionTypes = ['transfer', 'buy', 'sell', 'mint'];
        const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
        
        const cryptos = ['BTC', 'ETH', 'CRC'];
        const crypto = cryptos[Math.floor(Math.random() * cryptos.length)];
        
        const amount = parseFloat((Math.random() * 10).toFixed(4));
        
        // Generate random addresses
        const fromAddress = generateRandomAddress();
        const toAddress = generateRandomAddress();
        
        transactions.push({
          id: `tx-${i}-${j}`,
          type,
          from: fromAddress,
          to: toAddress,
          amount,
          crypto,
          fee: parseFloat((Math.random() * 0.01).toFixed(6)),
          timestamp: new Date(Date.now() - (numBlocks - i) * 600000 - j * 60000).toISOString()
        });
      }
      
      // Generate block hash (simplified)
      const blockData = `${i}${previousHash}${timestamp}${JSON.stringify(transactions)}${nonce}`;
      const currentHash = generateSimpleHash(blockData);
      
      blocks.push({
        height: i,
        hash: currentHash,
        previousHash,
        timestamp,
        transactions,
        nonce,
        difficulty,
        size: Math.floor(Math.random() * 1000) + 500,
        confirmations: numBlocks - i
      });
      
      previousHash = currentHash;
    }
    
    return blocks;
  };
  
  // Generate a simple hash for simulation purposes
  const generateSimpleHash = (data) => {
    // This is a very simplified hash function for demonstration
    // In a real blockchain, a cryptographic hash function like SHA-256 would be used
    let hash = '';
    const characters = '0123456789abcdef';
    
    // Generate a random hash with leading zeros to simulate mining difficulty
    for (let i = 0; i < 64; i++) {
      if (i < 4) {
        hash += '0'; // Simulate difficulty with leading zeros
      } else {
        hash += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    
    return hash;
  };
  
  // Generate a random blockchain address
  const generateRandomAddress = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let address = '0x';
    
    for (let i = 0; i < 40; i++) {
      address += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return address;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR');
  };
  
  // Truncate long strings (like hashes and addresses)
  const truncate = (str, length = 10) => {
    if (!str) return '';
    if (str.length <= length) return str;
    return `${str.substring(0, length)}...${str.substring(str.length - 4)}`;
  };

  return (
    <div className="explorer-container">
      <h1 className="explorer-title">Explorateur Blockchain</h1>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="explorer-grid">
          <div className="blocks-section">
            <div className="explorer-card">
              <div className="explorer-card-header">
                <h2 className="explorer-card-title">Blocs</h2>
              </div>
              <div className="blocks-list-container">
                <ul className="blocks-list">
                  {blockchain.map((block) => (
                    <li 
                      key={block.hash}
                      className={`block-item ${selectedBlock && selectedBlock.hash === block.hash ? 'block-item-selected' : ''}`}
                      onClick={() => setSelectedBlock(block)}
                    >
                      <div className="block-content">
                        <div className="block-header">
                          <span className="block-number">Bloc #{block.height}</span>
                          <span className="block-confirmations">{block.confirmations} confirmations</span>
                        </div>
                        <div className="block-details">
                          <div>Hash: {truncate(block.hash)}</div>
                          <div>{formatDate(block.timestamp)}</div>
                          <div>{block.transactions.length} transactions</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="block-details-section">
            {selectedBlock && (
              <div className="explorer-card">
                <div className="explorer-card-header">
                  <h2 className="explorer-card-title">Détails du Bloc #{selectedBlock.height}</h2>
                </div>
                <div className="explorer-card-body">
                  <div className="block-properties-grid">
                    <div className="block-property">
                      <h3 className="property-label">Hash du Bloc</h3>
                      <p className="property-value hash-value">{selectedBlock.hash}</p>
                    </div>
                    <div className="block-property">
                      <h3 className="property-label">Hash du Bloc Précédent</h3>
                      <p className="property-value hash-value">{selectedBlock.previousHash}</p>
                    </div>
                    <div className="block-property">
                      <h3 className="property-label">Horodatage</h3>
                      <p className="property-value">{formatDate(selectedBlock.timestamp)}</p>
                    </div>
                    <div className="block-property">
                      <h3 className="property-label">Confirmations</h3>
                      <p className="property-value">{selectedBlock.confirmations}</p>
                    </div>
                    <div className="block-property">
                      <h3 className="property-label">Difficulté</h3>
                      <p className="property-value">{selectedBlock.difficulty}</p>
                    </div>
                    <div className="block-property">
                      <h3 className="property-label">Nonce</h3>
                      <p className="property-value">{selectedBlock.nonce}</p>
                    </div>
                    <div className="block-property">
                      <h3 className="property-label">Taille</h3>
                      <p className="property-value">{selectedBlock.size} octets</p>
                    </div>
                    <div className="block-property">
                      <h3 className="property-label">Transactions</h3>
                      <p className="property-value">{selectedBlock.transactions.length}</p>
                    </div>
                  </div>
                  
                  <h3 className="transactions-title">Transactions</h3>
                  
                  <div className="table-container">
                    <table className="transactions-table">
                      <thead className="table-header">
                        <tr>
                          <th className="table-heading text-left">
                            ID de Transaction
                          </th>
                          <th className="table-heading text-left">
                            Type
                          </th>
                          <th className="table-heading text-left">
                            De
                          </th>
                          <th className="table-heading text-left">
                            À
                          </th>
                          <th className="table-heading text-right">
                            Montant
                          </th>
                          <th className="table-heading text-right">
                            Frais
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {selectedBlock.transactions.map((tx) => (
                          <tr key={tx.id} className="table-row">
                            <td className="table-cell tx-id">
                              {truncate(tx.id, 8)}
                            </td>
                            <td className="table-cell">
                              <span className="tx-type-badge">
                                {tx.type === 'buy' ? 'achat' : 
                                 tx.type === 'sell' ? 'vente' :
                                 tx.type === 'transfer' ? 'transfert' :
                                 tx.type === 'mint' ? 'création' : tx.type}
                              </span>
                            </td>
                            <td className="table-cell address">
                              {truncate(tx.from, 8)}
                            </td>
                            <td className="table-cell address">
                              {truncate(tx.to, 8)}
                            </td>
                            <td className="table-cell text-right">
                              {tx.amount} {tx.crypto}
                            </td>
                            <td className="table-cell text-right">
                              {tx.fee}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="explorer-info-section">
        <h2 className="info-title">Comment Fonctionne la Blockchain</h2>
        
        <div className="info-grid">
          <div className="info-card">
            <h3 className="info-card-title">Blocs & Chaînes</h3>
            <p className="info-text">
              Une blockchain est un registre numérique distribué qui enregistre les transactions sur de nombreux ordinateurs. 
              Chaque bloc contient un horodatage, des données de transaction et un hash cryptographique du bloc précédent, 
              créant ainsi une chaîne sécurisée de blocs.
            </p>
          </div>
          
          <div className="info-card">
            <h3 className="info-card-title">Minage & Consensus</h3>
            <p className="info-text">
              Le minage est le processus d'ajout de nouveaux blocs à la blockchain en résolvant des puzzles mathématiques complexes. 
              Ce processus crée un consensus entre tous les participants sur l'état de la blockchain.
            </p>
          </div>
          
          <div className="info-card">
            <h3 className="info-card-title">Sécurité Cryptographique</h3>
            <p className="info-text">
              La blockchain utilise des techniques cryptographiques pour sécuriser les transactions. Chaque bloc possède un hash unique généré à partir de son contenu. 
              Modifier des données dans un bloc changerait son hash, rendant toute falsification évidente.
            </p>
          </div>
          
          <div className="info-card">
            <h3 className="info-card-title">Décentralisation</h3>
            <p className="info-text">
              Au lieu de s'appuyer sur une autorité centrale, la blockchain distribue ses données sur de nombreux ordinateurs (nœuds). 
              Cela rend le système résistant à la censure et aux points uniques de défaillance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainExplorerPage; 