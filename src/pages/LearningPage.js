import React, { useState } from 'react';
import './LearningPage.css';

const LearningPage = () => {
  const [activeTab, setActiveTab] = useState('basics');
  
  const tabs = [
    { id: 'basics', label: 'Principes de Base' },
    { id: 'blockchain', label: 'Technologie Blockchain' },
    { id: 'wallets', label: 'Portefeuilles & Clés' },
    { id: 'mining', label: 'Minage & Consensus' },
    { id: 'defi', label: 'DeFi & Contrats Intelligents' }
  ];

  return (
    <div className="learning-container">
      <h1 className="learning-title">Centre d'Apprentissage</h1>
      
      <div className="learning-card">
        <div className="tabs-header">
          <nav className="tabs-navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="tab-content">
          {activeTab === 'basics' && (
            <div>
              <h2 className="section-title">Principes de Base des Cryptomonnaies</h2>
              
              <div className="content-section">
                <div>
                  <h3 className="subsection-title">Qu'est-ce qu'une Cryptomonnaie?</h3>
                  <p className="text-content">
                    Une cryptomonnaie est une monnaie numérique ou virtuelle qui utilise la cryptographie pour sa sécurité et fonctionne sur une technologie appelée blockchain. 
                    Contrairement aux monnaies traditionnelles émises par les gouvernements (monnaies fiduciaires), les cryptomonnaies sont généralement décentralisées et ne sont pas contrôlées par une autorité centrale.
                  </p>
                </div>
                
                <div className="feature-grid">
                  <div className="feature-card">
                    <h4 className="feature-title">Caractéristiques Principales</h4>
                    <ul className="feature-list">
                      <li>Décentralisée: Non contrôlée par une entité unique</li>
                      <li>Sécurisée: Protégée par la cryptographie</li>
                      <li>Transparente: Toutes les transactions sont enregistrées publiquement</li>
                      <li>Sans frontières: Peut être envoyée partout dans le monde</li>
                      <li>Offre limitée: De nombreuses cryptomonnaies ont une offre maximale fixe</li>
                    </ul>
                  </div>
                  
                  <div className="feature-card">
                    <h4 className="feature-title">Cryptomonnaies Populaires</h4>
                    <ul className="feature-list">
                      <li><strong>Bitcoin (BTC):</strong> La première et la plus précieuse cryptomonnaie</li>
                      <li><strong>Ethereum (ETH):</strong> Propose des contrats intelligents et des applications décentralisées</li>
                      <li><strong>Ripple (XRP):</strong> Conçu pour les paiements transfrontaliers</li>
                      <li><strong>Litecoin (LTC):</strong> Créé comme une version "plus légère" du Bitcoin</li>
                      <li><strong>Cardano (ADA):</strong> Se concentre sur la durabilité et l'évolutivité</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="subsection-title">Comment Fonctionnent les Cryptomonnaies</h3>
                  <p className="text-content">
                    Les cryptomonnaies fonctionnent grâce à une technologie appelée blockchain, qui est un registre distribué maintenu par un réseau d'ordinateurs. 
                    Lorsque quelqu'un envoie une cryptomonnaie, la transaction est diffusée sur ce réseau et vérifiée par des nœuds grâce à la cryptographie.
                  </p>
                  
                  <div className="process-card">
                    <h4 className="feature-title">Processus de Transaction Simplifié:</h4>
                    <ol className="process-list">
                      <li>Alice veut envoyer 1 Bitcoin à Bob</li>
                      <li>Alice initie la transaction en utilisant sa clé privée</li>
                      <li>La transaction est diffusée sur le réseau Bitcoin</li>
                      <li>Les mineurs vérifient la transaction et l'incluent dans un bloc</li>
                      <li>Le bloc est ajouté à la blockchain</li>
                      <li>Bob reçoit le Bitcoin dans son portefeuille</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'blockchain' && (
            <div>
              <h2 className="section-title">Technologie Blockchain</h2>
              
              <div className="content-section">
                <div>
                  <h3 className="subsection-title">Qu'est-ce que la Blockchain?</h3>
                  <p className="text-content">
                    La blockchain est une base de données distribuée ou un registre partagé entre les nœuds d'un réseau informatique. Elle stocke les informations au format numérique et est surtout connue pour son rôle dans les systèmes de cryptomonnaie, permettant de maintenir un registre sécurisé et décentralisé des transactions.
                  </p>
                  <p className="text-content">
                    L'innovation de la blockchain est qu'elle garantit la fidélité et la sécurité des enregistrements de données et génère la confiance sans nécessiter un tiers de confiance.
                  </p>
                </div>
                
                <div className="components-card">
                  <h3 className="subsection-title">Composants Clés de la Blockchain</h3>
                  
                  <div className="components-list">
                    <div className="component-item">
                      <h4 className="component-title">Blocs</h4>
                      <p className="text-content">
                        Les blocs sont des structures de données au sein de la base de données blockchain où les données de transaction sont enregistrées de façon permanente. 
                        Un bloc contient une liste de transactions, une référence au bloc précédent (créant la "chaîne"), et un identifiant unique (hash).
                      </p>
                    </div>
                    
                    <div className="component-item">
                      <h4 className="component-title">Hachages Cryptographiques</h4>
                      <p className="text-content">
                        Chaque bloc contient un identifiant unique appelé hash, créé en faisant passer le contenu du bloc par une fonction de hachage cryptographique. 
                        Toute modification du contenu du bloc entraînerait un hash complètement différent, rendant la falsification évidente.
                      </p>
                    </div>
                    
                    <div className="component-item">
                      <h4 className="component-title">Réseau Distribué</h4>
                      <p className="text-content">
                        La blockchain est maintenue par un réseau d'ordinateurs (nœuds) plutôt que par une autorité centrale. 
                        Chaque nœud possède une copie complète de la blockchain, ce qui rend le système très résistant aux attaques et aux défaillances.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="subsection-title">Types de Blockchains</h3>
                  
                  <div className="types-grid">
                    <div className="type-card">
                      <h4 className="type-title">Blockchains Publiques</h4>
                      <p className="text-content">
                        Ouvertes à tous, complètement décentralisées et transparentes. Exemples : Bitcoin et Ethereum.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Blockchains Privées</h4>
                      <p className="text-content">
                        Limitées à des participants sélectionnés, souvent utilisées par les organisations à des fins internes.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Blockchains Consortium</h4>
                      <p className="text-content">
                        Exploitées par un groupe d'organisations plutôt que par une seule entité ou le public.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Blockchains Hybrides</h4>
                      <p className="text-content">
                        Combinent des éléments des blockchains privées et publiques.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'wallets' && (
            <div>
              <h2 className="section-title">Portefeuilles & Clés</h2>
              
              <div className="content-section">
                <div>
                  <h3 className="subsection-title">Que sont les Portefeuilles de Cryptomonnaies?</h3>
                  <p className="text-content">
                    Les portefeuilles de cryptomonnaies sont des outils numériques qui permettent aux utilisateurs de stocker, d'envoyer et de recevoir des cryptomonnaies. 
                    Malgré leur nom, les portefeuilles crypto ne stockent pas vos pièces. Ils stockent plutôt les clés cryptographiques 
                    qui vous donnent accès à vos adresses de cryptomonnaie sur la blockchain.
                  </p>
                </div>
                
                <div className="wallet-grid">
                  <div>
                    <h3 className="subsection-title">Clés Publiques & Privées</h3>
                    
                    <div className="keys-card">
                      <div className="key-item">
                        <h4 className="key-title">Clé Privée</h4>
                        <p className="text-content">
                          Une clé privée est comme votre mot de passe ou code PIN. C'est un nombre secret qui vous permet de dépenser la cryptomonnaie 
                          associée à l'adresse de votre portefeuille. Vous ne devriez jamais partager votre clé privée avec qui que ce soit.
                        </p>
                        <div className="code-example">
                          Exemple: 5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF
                        </div>
                      </div>
                      
                      <div className="key-item">
                        <h4 className="key-title">Clé Publique</h4>
                        <p className="text-content">
                          Une clé publique est dérivée de votre clé privée à l'aide d'algorithmes cryptographiques. Elle est utilisée pour générer l'adresse de votre portefeuille, 
                          que vous pouvez partager avec d'autres pour recevoir de la cryptomonnaie.
                        </p>
                      </div>
                      
                      <div className="key-item">
                        <h4 className="key-title">Adresse de Portefeuille</h4>
                        <p className="text-content">
                          Une adresse de portefeuille est une version hachée de votre clé publique. C'est ce que vous partagez avec les autres lorsque vous souhaitez recevoir de la cryptomonnaie.
                        </p>
                        <div className="code-example">
                          Exemple: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="subsection-title">Types de Portefeuilles</h3>
                    
                    <div className="wallet-types">
                      <div className="wallet-type-card">
                        <h4 className="wallet-type-title">Portefeuilles Matériels</h4>
                        <p className="text-content">
                          Appareils physiques qui stockent vos clés privées hors ligne, offrant une haute sécurité. Exemples: Ledger, Trezor.
                        </p>
                      </div>
                      
                      <div className="wallet-type-card">
                        <h4 className="wallet-type-title">Portefeuilles Logiciels</h4>
                        <p className="text-content">
                          Applications installées sur votre ordinateur ou smartphone. Exemples: Exodus, Electrum.
                        </p>
                      </div>
                      
                      <div className="wallet-type-card">
                        <h4 className="wallet-type-title">Portefeuilles Web</h4>
                        <p className="text-content">
                          Services en ligne qui stockent vos clés privées. Faciles à utiliser mais moins sécurisés que les portefeuilles matériels ou logiciels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Mining & Consensus tab content */}
          {activeTab === 'mining' && (
            <div className="mining-content">
              <h2 className="section-title">Minage & Consensus</h2>
              
              <div className="content-section">
                <div>
                  <h3 className="subsection-title">Qu'est-ce que le Minage de Cryptomonnaie?</h3>
                  <p className="text-content">
                    Le minage est le processus par lequel de nouvelles cryptomonnaies sont créées et les transactions sont vérifiées et ajoutées à la blockchain. 
                    Les mineurs utilisent des ordinateurs puissants pour résoudre des problèmes mathématiques complexes qui vérifient les transactions.
                  </p>
                </div>
                
                <div className="feature-grid">
                  <div className="feature-card">
                    <h4 className="feature-title">Comment Fonctionne le Minage</h4>
                    <ol className="process-list">
                      <li>Les mineurs collectent les transactions en attente dans un bloc</li>
                      <li>Ils tentent de résoudre un problème mathématique complexe (preuve de travail)</li>
                      <li>Le premier mineur à résoudre le problème gagne le droit d'ajouter le bloc à la blockchain</li>
                      <li>Le mineur reçoit une récompense en cryptomonnaie nouvellement créée</li>
                      <li>Les autres mineurs vérifient que le bloc est valide</li>
                      <li>Une fois validé, le bloc est ajouté à la blockchain</li>
                    </ol>
                  </div>
                  
                  <div className="feature-card">
                    <h4 className="feature-title">Matériel de Minage</h4>
                    <ul className="feature-list">
                      <li><strong>ASIC (Application-Specific Integrated Circuit):</strong> Matériel spécialisé pour miner des cryptomonnaies spécifiques comme Bitcoin</li>
                      <li><strong>GPU (Graphics Processing Units):</strong> Cartes graphiques puissantes utilisées pour miner des cryptomonnaies comme Ethereum</li>
                      <li><strong>CPU (Central Processing Units):</strong> Moins efficaces, mais peuvent être utilisés pour certaines cryptomonnaies</li>
                      <li><strong>Pools de minage:</strong> Groupes de mineurs qui combinent leur puissance de calcul et partagent les récompenses</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="subsection-title">Mécanismes de Consensus</h3>
                  <p className="text-content">
                    Les mécanismes de consensus sont les protocoles qui permettent à tous les participants d'un réseau blockchain de s'accorder sur l'état actuel de la blockchain.
                  </p>
                  
                  <div className="types-grid">
                    <div className="type-card">
                      <h4 className="type-title">Preuve de Travail (PoW)</h4>
                      <p className="text-content">
                        Utilisé par Bitcoin et de nombreuses autres cryptomonnaies. Les mineurs doivent résoudre des problèmes complexes pour valider les transactions, consommant beaucoup d'énergie.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Preuve d'Enjeu (PoS)</h4>
                      <p className="text-content">
                        Les validateurs sont sélectionnés pour créer des blocs en fonction de la quantité de cryptomonnaie qu'ils détiennent et sont prêts à "mettre en jeu". Plus économe en énergie que PoW.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Preuve d'Autorité (PoA)</h4>
                      <p className="text-content">
                        Les transactions sont validées par des nœuds approuvés, généralement utilisés dans les blockchains privées ou les solutions d'entreprise.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Preuve de Capacité (PoC)</h4>
                      <p className="text-content">
                        Les mineurs utilisent de l'espace disque plutôt que de la puissance de calcul, rendant le minage plus accessible et économe en énergie.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="subsection-title">Impact Environnemental et Alternatives</h3>
                  <p className="text-content">
                    Le minage de cryptomonnaie, en particulier avec le mécanisme de Preuve de Travail, consomme beaucoup d'énergie. L'industrie explore des alternatives plus durables:
                  </p>
                  <ul className="feature-list">
                    <li>Transition vers la Preuve d'Enjeu (comme Ethereum)</li>
                    <li>Utilisation d'énergies renouvelables pour le minage</li>
                    <li>Développement de mécanismes de consensus plus efficaces</li>
                    <li>Méthodes de minage à faible consommation d'énergie</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* DeFi tab content */}
          {activeTab === 'defi' && (
            <div className="defi-content">
              <h2 className="section-title">DeFi & Contrats Intelligents</h2>
              
              <div className="content-section">
                <div>
                  <h3 className="subsection-title">Qu'est-ce que la Finance Décentralisée (DeFi)?</h3>
                  <p className="text-content">
                    La Finance Décentralisée, ou DeFi, est un écosystème de services financiers construit sur des réseaux blockchain, principalement Ethereum. 
                    Elle vise à créer un système financier ouvert et sans permission qui élimine le besoin d'intermédiaires traditionnels comme les banques.
                  </p>
                </div>
                
                <div className="feature-grid">
                  <div className="feature-card">
                    <h4 className="feature-title">Caractéristiques de la DeFi</h4>
                    <ul className="feature-list">
                      <li><strong>Décentralisation:</strong> Fonctionne sans autorité centrale</li>
                      <li><strong>Sans permission:</strong> Accessible à tous avec une connexion internet</li>
                      <li><strong>Transparence:</strong> Code et transactions visibles par tous</li>
                      <li><strong>Interopérabilité:</strong> Les applications peuvent être combinées comme des "blocs de construction"</li>
                      <li><strong>Autonomie:</strong> Contrôle total de vos actifs</li>
                    </ul>
                  </div>
                  
                  <div className="feature-card">
                    <h4 className="feature-title">Applications DeFi Populaires</h4>
                    <ul className="feature-list">
                      <li><strong>Prêt et emprunt:</strong> Aave, Compound</li>
                      <li><strong>Échanges décentralisés (DEX):</strong> Uniswap, SushiSwap</li>
                      <li><strong>Stablecoins:</strong> DAI, USDC</li>
                      <li><strong>Dérivés:</strong> Synthetix, dYdX</li>
                      <li><strong>Assurance:</strong> Nexus Mutual</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="subsection-title">Contrats Intelligents (Smart Contracts)</h3>
                  <p className="text-content">
                    Les contrats intelligents sont des programmes informatiques auto-exécutables qui s'exécutent lorsque des conditions prédéterminées sont remplies. 
                    Ils sont la technologie fondamentale qui rend possible la DeFi et d'autres applications blockchain.
                  </p>
                  
                  <div className="process-card">
                    <h4 className="feature-title">Comment Fonctionnent les Contrats Intelligents</h4>
                    <ol className="process-list">
                      <li>Les termes du contrat sont écrits en code informatique</li>
                      <li>Le code est déployé sur une blockchain (généralement Ethereum)</li>
                      <li>Le contrat s'exécute automatiquement lorsque certaines conditions sont remplies</li>
                      <li>Aucune partie ne peut modifier le contrat une fois déployé</li>
                      <li>Les résultats sont vérifiés par le réseau blockchain</li>
                    </ol>
                  </div>
                </div>
                
                <div>
                  <h3 className="subsection-title">Risques et Défis</h3>
                  
                  <div className="types-grid">
                    <div className="type-card">
                      <h4 className="type-title">Risques de Sécurité</h4>
                      <p className="text-content">
                        Les vulnérabilités dans le code des contrats intelligents peuvent être exploitées, entraînant des pertes de fonds. Plusieurs hacks importants ont eu lieu dans l'espace DeFi.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Risques Réglementaires</h4>
                      <p className="text-content">
                        L'environnement réglementaire pour la DeFi est encore en évolution. Les futures réglementations pourraient avoir un impact significatif sur l'espace.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Évolutivité</h4>
                      <p className="text-content">
                        Les blockchains comme Ethereum font face à des défis d'évolutivité, entraînant parfois des frais de transaction élevés et des temps de confirmation lents.
                      </p>
                    </div>
                    
                    <div className="type-card">
                      <h4 className="type-title">Complexité</h4>
                      <p className="text-content">
                        Les applications DeFi peuvent être difficiles à comprendre pour les utilisateurs non techniques, ce qui peut limiter l'adoption.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="subsection-title">L'Avenir de la DeFi</h3>
                  <p className="text-content">
                    La Finance Décentralisée évolue rapidement et pourrait potentiellement transformer le système financier traditionnel. Les développements futurs pourraient inclure:
                  </p>
                  <ul className="feature-list">
                    <li>Meilleure interopérabilité entre différentes blockchains</li>
                    <li>Solutions d'évolutivité pour réduire les frais et augmenter la vitesse</li>
                    <li>Intégration avec la finance traditionnelle</li>
                    <li>Outils de gestion des risques plus sophistiqués</li>
                    <li>Interfaces utilisateur plus conviviales pour favoriser l'adoption massive</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPage; 