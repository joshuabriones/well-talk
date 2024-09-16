"use client";

import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "stompjs/lib/stomp.js";

export default function WebSocketNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // Connect to your WebSocket endpoint
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/notification", (message) => {
        setNotifications((prev) => [...prev, message.body]); // Add new notification to the list
      });
    });

    return () => {
      // stompClient.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}
