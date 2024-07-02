import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface Message {
    _id: string;
    user: string;
    content: string;
}

export const MessageBoard = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>('http://localhost:5000/messages');
            setMessages(response.data);
        } catch (error) {
            setError('Error fetching messages');
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/message', {
                user: 'Anonymous',  // Replace with actual user identification logic
                content: newMessage
            });
            setNewMessage('');
            fetchMessages();  // Refresh messages after submission
        } catch (error) {
            setError('Error submitting message');
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(event.target.value);
    };

    return (
        <div className="message-board">
            <h2>Message Board</h2>
            <div className="messages">
                {messages.map((message) => (
                    <div key={message._id} className="message">
                        <p>{message.user}: {message.content}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    required
                />
                <button type="submit">Send Message</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default MessageBoard;