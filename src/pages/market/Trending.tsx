// Trending.tsx
import React from 'react';

const Trending: React.FC = () => {
  // Placeholder data
  const trendingItems = [
    { title: 'Tech Stocks Surge', description: 'Tech stocks saw a significant rise in trading volume today.' },
    { title: 'Cryptocurrency Market Update', description: 'Bitcoin and Ethereum prices reach new highs.' },
    { title: 'Federal Reserve Announces Rate Change', description: 'Interest rates are expected to remain stable.' },
  ];

  return (
    <div>
      <h2>Trending</h2>
      <ul>
        {trendingItems.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trending;
