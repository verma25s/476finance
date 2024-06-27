// StockMarket.tsx
import React from 'react';

const StockMarket: React.FC = () => {
  // Placeholder data
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 145.12 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2525.47 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 280.48 },
  ];

  return (
    <div>
      <h2>Stock Market</h2>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>
            <strong>{stock.symbol}</strong> - {stock.name}: ${stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockMarket;
