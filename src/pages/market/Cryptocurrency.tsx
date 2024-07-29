// Cryptocurrency.tsx
import React from 'react';

const Cryptocurrency: React.FC = () => {
  // Placeholder data
  const cryptocurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', price: 35100 },
    { symbol: 'ETH', name: 'Ethereum', price: 2100 },
    { symbol: 'XRP', name: 'Ripple', price: 0.65 },
  ];

  return (
    <div>
      <h2>Cryptocurrency</h2>
      <ul>

        <div className="Crypto">
       {cryptocurrencies.map((crypto, index) => (
          <li key={index}>
            <strong>{crypto.symbol}</strong> - {crypto.name}: ${crypto.price}
          </li>
       
        
        ))} </div> 
      </ul>
    </div> 
    
  );
}

export default Cryptocurrency;
