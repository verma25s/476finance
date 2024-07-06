import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

interface Post {
  title: string;
  email: string;
  content: string;
  timestamp: string;
}

const FullPost: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    fetchPost();
  }, [title]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/forum-posts/${title}`);
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
      <button onClick={() => history.push('/')}>Back to Forum</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {post ? (
        <div className="post">
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