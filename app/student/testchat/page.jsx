"use client";

import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/websocket");
    stompClient = Stomp.over(socket);

    console.log("Connecting to WebSocket..."); // Debug log

    stompClient.connect({}, onConnected, onError);

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
        console.log("Disconnected from WebSocket."); // Debug log
      }
    };
  }, []);

  // Called when the WebSocket connection is established
  const onConnected = () => {
    setConnected(true);
    console.log("Connected to WebSocket!"); // Debug log

    // Subscribe to the public topic
    stompClient.subscribe("/topic/public", onMessageReceived);
    console.log("Subscribed to /topic/public"); // Debug log
  };

  // Called when there's an error with the WebSocket connection
  const onError = (error) => {
    console.error("WebSocket connection error:", error); // Debug log
  };

  // Called when a message is received from the WebSocket
  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    console.log("Received message:", message); // Debug log
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  // Register user when they join
  const registerUser = (e) => {
    e.preventDefault();

    if (username.trim() !== "") {
      const chatMessage = {
        sender: username,
        type: "JOIN",
      };

      stompClient.send("/app/chat.register", {}, JSON.stringify(chatMessage));
    }
  };

  // Send a message when the user submits
  const sendMessage = (e) => {
    e.preventDefault();

    if (messageInput.trim() !== "") {
      const chatMessage = {
        sender: username,
        content: messageInput,
        type: "CHAT",
      };

      stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
      setMessageInput(""); // Clear the input field
    }
  };

  return (
    <div>
      {!connected && (
        <div>
          <h2>Enter your username to join the chat</h2>
          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Join Chat</button>
          </form>
        </div>
      )}

      {connected && (
        <div>
          <h2>Chat Room</h2>
          <div
            id="chat-box"
            style={{
              height: "300px",
              overflowY: "scroll",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
