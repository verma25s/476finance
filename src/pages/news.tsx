import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TickerSentiment {
  relevance_score: string;
  ticker: string;
  ticker_sentiment_label: string;
  ticker_sentiment_score: number;
}

interface NewsArticle {
  authors: string[];
  banner_image: string;
  category_within_source: string;
  overall_sentiment_label: string;
  overall_sentiment_score: number;
  source: string;
  source_domain: string;
  summary: string;
  ticker_sentiment: TickerSentiment[];
  time_published: string;
  title: string;
  topics: string[];
  url: string;
}

interface NewsFeedResponse {
  feed: NewsArticle[];
}

export const News = () => {
  const [newsFeed, setNewsFeed] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsFeedResponse>('http://localhost:5000/news');
        setNewsFeed(response.data.feed);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="top-gainers">
      <h1 className="cp">News</h1>
      <h1>News Feed</h1>
      {newsFeed.map((article, index) => (
        <div key={index} className="news-article">
          <h2>{article.title}</h2>
        
          <p>By: {article.authors.join(', ')}</p>
          <p>Source: {article.source} ({article.source_domain})</p>
          <p>Published: {new Date(article.time_published).toLocaleString()}</p>
          <p>Sentiment: {article.overall_sentiment_label} ({article.overall_sentiment_score})</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default News;