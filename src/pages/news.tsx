import React, { useState, useEffect } from 'react';
import './news.css';
export interface Topic {
    topic: string;
    relevance_score: string;
  }
  
  export interface TickerSentiment {
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: string;
    ticker_sentiment_label: string;
  }
  
  export interface Article {
    title: string;
    url: string;
    time_published: string;
    authors: string[];
    summary: string;
    banner_image: string;
    source: string;
    category_within_source: string;
    source_domain: string;
    topics: Topic[];
    overall_sentiment_score: number | null;
    overall_sentiment_label: string | null;
    ticker_sentiment: TickerSentiment[];
  }
  
  export interface FeedData {
    items: string;
    sentiment_score_definition: string;
    relevance_score_definition: string;
    feed: Article[];
  }

export const News: React.FC = () => {
  const [feedData, setFeedData] = useState<FeedData | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch('/news'); // Replace with your actual API endpoint
        const data: FeedData = await response.json();
        setFeedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="news-feed">
      <h1>News Feed</h1>
      {feedData ? (
        <div className="articles" >
          {feedData.feed.map((article: Article, index: number) => (
            <div key={index} className="article">
              <h2><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h2>
              <p><strong>Source:</strong> {article.source}</p>
              <p><strong>Published:</strong> {new Date(article.time_published).toLocaleString()}</p>
              <p><strong>Summary:</strong> {article.summary}</p>
              <p><strong>Overall Sentiment:</strong> {article.overall_sentiment_label}</p>
              <p><strong>Topics:</strong> {article.topics.map(topic => topic.topic).join(', ')}</p>
              <p><strong>Ticker Sentiment:</strong> {article.ticker_sentiment.map(ticker => (
                <span key={ticker.ticker}>{ticker.ticker} ({ticker.ticker_sentiment_label})</span>
              ))}</p>
              <br></br><br></br>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default News;