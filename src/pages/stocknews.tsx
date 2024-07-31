// import React and attributes for side effects and state management
import React, { useEffect, useState } from 'react';
// import useParams hook for accessing URL parameters
import { useParams } from 'react-router-dom';
// import CSS file for proper styling
import './news.css';

// define TypeScript interface for NewsArticle
interface NewsArticle {
  id: number;
  datetime: number;
  headline: string;
  source: string;
  summary: string;
  url: string;

}

// define the StockNews component as a functional React component
export const StockNews: React.FC = () => {
  const [newsFeed, setNewsFeed] = useState<NewsArticle[]>([]);
  const { symbol } = useParams<{ symbol: string }>();

  // effect hook to fetch news when the component mounts or the symbol changes
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/stocknews/${symbol}`);
        const newsData: NewsArticle[] = await response.json();
        setNewsFeed(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    if (symbol) {
      fetchNews();
    }
  }, [symbol]);

  return (
    <div className="top-gainers">
      <h1 className="cp">News</h1>
      {newsFeed.length > 0 ? (
        newsFeed.map((article) => (
          <div key={article.id} className="news-article">
            <h2>{article.headline}</h2>
            <p><strong>Source:</strong> {article.source}</p>
            <p><strong>Published:</strong> {new Date(article.datetime * 1000).toLocaleString()}</p>
            <p><strong>Summary:</strong> {article.summary}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Link to Article</a>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
// export the StockNews component as default
export default StockNews;