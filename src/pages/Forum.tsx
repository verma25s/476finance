import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/forum-posts');
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
    
  };

  const renderPostContent = (content: string) => {
    if (typeof content !== 'string') {
        return '';
      }
      const lines = content.split('\n');
    if (lines.length > 3) {
      return lines.slice(0, 3).join('\n') + '...';
    }
    return content;
  };
  return (
    <div>
      <h1>Forum</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
      {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.title} className="post" onClick={() => handlePostClick(post.title)}>
              <p><strong>Title:</strong> {post.title}</p>
              <p><strong>User:</strong> {post.email}</p>
              <p><strong>Content:</strong> {renderPostContent(post.content)}</p>
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
  );
};

export default Forum;