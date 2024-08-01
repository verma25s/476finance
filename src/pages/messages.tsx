import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

interface Message {
  _id: string;
  email: string;
  content: string;
  timestamp: Date;
}

export const MessageBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cookies] = useCookies(['userEmail']); // Assuming you have set 'userEmail' cookie in your application

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        setError(null);
      } else {
        setError('Error fetching messages');
      }
    } catch (error) {
      setError('Error fetching messages');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if( cookies.userEmail){
    const currentTime = new Date()
    try {
      const response = await fetch('http://localhost:5000/add-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cookies.userEmail, content: newMessage, timestamp: currentTime }), // Add email from cookies
      });

      if (response.ok) {
        fetchMessages(); // Refresh messages after adding a new one
        setNewMessage('');
        setError(null);
      } else {
        setError('Failed to send message');
      }
    } catch (error) {
      setError('Error adding message');
      setSuccess(null);
    }}
    else{
        setError('Please Login First')
    }


  };

  return (
    <div className="messages">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      <h1>Message Board</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <div>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div className="message" key={message._id}>
               {message.timestamp && <p> {message.email}   {new Date(message.timestamp).toLocaleString()}</p>}
               <br></br>
              {message.content}
            </div>
          ))) : 
(
          <p>No messages available</p>
        )}
      </div>
    </div>
  );
};

export default MessageBox;