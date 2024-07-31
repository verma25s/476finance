// import necessary React component
import React, { useEffect, useState } from 'react';
// import hooks for accessing route parameters and navigation
import { useParams, useNavigate } from 'react-router-dom';

// define the Post interface for TypeScript
interface Post {
  title: string;
  email: string;
  content: string;
  timestamp: string;
}

// define the FullPost component
export const FullPost = () => {
  const { title } = useParams<{ title: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate =  useNavigate();

  // useEffect part to fetch the post data
  useEffect(() => {
    fetchPost();
  }, [title]);

// function to fetch post data from the server
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
// export the FullPost component as default
export default FullPost;