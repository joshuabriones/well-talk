"use client";
import { useEffect, useState } from 'react';
import WebSocketService from '@/WebSocketService';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        WebSocketService.connect(message => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            WebSocketService.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const message = { content: input, senderId: 1, receiverId: 2 }; // Example message structure
        WebSocketService.sendMessage(message);
        setInput('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.content}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;