// import necessary React components
import React, { useEffect, useState } from 'react';
// import CSS for styling the component
import './news.css';

// defining the NewsArticle interface for TypeScript
interface NewsArticle {
  category: string;
  datetime: number;
  headline: string;
  source: string;
  url: string;
  id: string;
  
}

// defining the News component
export const News = () => {
  const [newsFeed, setNewsFeed] = useState<NewsArticle[]>([]);

  // useEffect part to fetch news when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response =  await fetch(`/news`);
        // parse the JSON response
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
        <div key={article.id} className="news-article">
          <h2>{article.headline}</h2>
          <p>Source: {article.source}</p>
          <p>Published: {new Date(article.datetime * 1000 ).toLocaleString()}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Link to Article</a>
        </div>
      
    ))) : (
      <p>Loading...</p>
    )}

    </div>
  );
};
// export the News component as default
export default News;