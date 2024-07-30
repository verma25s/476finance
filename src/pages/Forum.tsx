import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {Link, useNavigate} from 'react-router-dom';
import "./Forum.css";
interface ForumPost {
  _id: string;
  email: string;
  title:string;
  content: string;
  timestamp: Date;
}

export const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPost, setNewPost] = useState<{ title: string; content: string }>({ title: '', content: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cookies] = useCookies(['userEmail']);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/forum-posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        setError(null);
      } else {
        setError('Error fetching posts');
      }
    } catch (error) {
      setError('Error fetching posts');
    }
  };

  const handleAddPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if( cookies.userEmail) {try {
      const response = await fetch('http://localhost:5000/add-forum-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cookies.userEmail, title: newPost.title, content: newPost.content }),
      });

      if (response.ok) {
        setSuccess('Post added successfully!');
        fetchPosts(); // Refresh posts after adding a new one
        setNewPost({ title: '', content: '' });
        setError(null);
      } else {
        setError('Failed to add post');
      }
    } catch (error) {
      setError('Error adding post');
      setSuccess(null);
    }}
    else{setError('Please Login First')}
  };

  const handleDeletePost = async (postId: string) => {
    if( cookies.userEmail) {
         try {
            const response = await fetch(`http://localhost:5000/delete-forum-post/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Post deleted successfully!');
        fetchPosts(); // Refresh posts after deleting one
        setError(null);
      } else {
        setError('Failed to delete post');
      }
    } catch (error) {
      setError('Error deleting post');
      setSuccess(null);
    }}

    else{setError('Please Login First')}




    
  };
  const handlePostClick = (postTitle: string) => {
    navigate(`/forum/${postTitle}`);
  };

  

  return  (
    <div className="forum-container">
      <div className="new-post-form">
        <h1>Forum</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Your Post"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
          <button type="submit">Add Post</button>
        </form>
      </div>
      <div className="posts-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post" onClick={() => handlePostClick(post.title)}>
              <p><strong>Title:</strong> {post.title}</p>
              <p><strong>User:</strong> {post.email}</p>
              <p className="postContent"><strong>Content:</strong> {post.content}</p>
              <p><strong>Timestamp:</strong> {new Date(post.timestamp).toLocaleString()}</p>
              {post.email === cookies.userEmail && (
                <button onClick={(e) => { e.stopPropagation(); handleDeletePost(post["_id"]); }}>Delete</button>
              )}
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};


export default Forum;