import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './news.css';

interface NewsArticle {
  id: number;
  datetime: number;
  headline: string;
  source: string;
  summary: string;
  url: string;

}

export const StockNews: React.FC = () => {
  const [newsFeed, setNewsFeed] = useState<NewsArticle[]>([]);
  const { symbol } = useParams<{ symbol: string }>();

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

export default StockNews;