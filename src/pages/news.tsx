import React, { useEffect, useState } from 'react';
import './news.css';

interface NewsArticle {
  category: string;
  datetime: number;
  headline: string;
  source: string;
  url: string;
  id: string;
  
}

export const News = () => {
  const [newsFeed, setNewsFeed] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response =  await fetch(`/news`);
        const newsData = await response.json();
        setNewsFeed(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);
    
  return (

    <div className="top-gainers">
      <h1 className="cp">News</h1>
      {newsFeed.length >0 ? (newsFeed.map((article, index) => (
        <div key={article.id} className="news-article" >
          <h2>{article.headline}</h2>
          <p>Source: {article.source}</p>
          <p>Published: {new Date(article.datetime * 1000 ).toLocaleString()}</p>
          <a  target="_blank" rel="noopener noreferrer">Link to Article</a>
        </div>
      
    ))) : (
      <p className="h3">Loading...</p>
    )}

    </div>
  );
};
export default News;