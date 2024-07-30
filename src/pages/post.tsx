import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Post {
  title: string;
  email: string;
  content: string;
  timestamp: string;
}

export const FullPost = () => {
  const { title } = useParams<{ title: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate =  useNavigate();

  useEffect(() => {
    fetchPost();
  }, [title]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/forum-posts/${title}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
        setError(null);
      } else {
        setError('Error fetching post');
      }
    } catch (error) {
      setError('Error fetching post');
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/forum')}>Back to Forum</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {post ? (
        <div className="detailed_post">
          <p><strong>Title:</strong> {post.title}</p>
          <p><strong>User:</strong> {post.email}</p>
          <p><strong>Content:</strong> {post.content}</p>
          <p><strong>Timestamp:</strong> {new Date(post.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default FullPost;