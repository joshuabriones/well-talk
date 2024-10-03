"use client";

import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Cookies from "js-cookie";

const senderId = 2;
const receiverId = 4;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Fetch all previous messages when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/api/messages?senderId=${senderId}&receiverId=${receiverId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data); // Assuming the response is an array of messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const socket = new SockJS(`${process.env.BASE_URL}/ws`);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Connected to WebSocket");

      client.subscribe("/topic/messages", (msg) => {
        const newMessage = JSON.parse(msg.body);
        console.log("New message parsed to JSON:", newMessage);

        // Check if the message already exists to prevent duplicates
        setMessages((prevMessages) => {
          // Only add the message if it doesn't exist already
          if (!prevMessages.find((m) => m.id === newMessage.id)) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
      });
    });

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []); // Ensuring this runs only once

  const sendMessage = () => {
    if (stompClient && message.trim() !== "") {
      const chatMessage = {
        senderId: senderId,
        receiverId: receiverId,
        content: message,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.senderId === senderId ? "You" : "Other"}:</b> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;

// "use client";

// import { useState, useEffect } from "react";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

// const senderId = 2;
// const receiverId = 4;

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     const socket = new SockJS("http://localhost:8080/ws");
//     const client = Stomp.over(socket);

//     client.connect({}, () => {
//       console.log("Connected to WebSocket");

//       client.subscribe("/topic/messages", (msg) => {
//         const newMessage = JSON.parse(msg.body);
//         console.log("New message parsed to JSON:", newMessage);

//         // Check if the message already exists to prevent duplicates
//         setMessages((prevMessages) => {
//           // Only add the message if it doesn't exist already
//           if (!prevMessages.find((m) => m.id === newMessage.id)) {
//             return [...prevMessages, newMessage];
//           }
//           return prevMessages;
//         });
//       });
//     });

//     setStompClient(client);

//     return () => {
//       if (client && client.connected) {
//         client.disconnect(() => {
//           console.log("Disconnected");
//         });
//       }
//     };
//   }, []); // Ensuring this runs only once

//   const sendMessage = () => {
//     if (stompClient && message.trim() !== "") {
//       const chatMessage = {
//         senderId: senderId,
//         receiverId: receiverId,
//         content: message,
//       };
//       stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg) => (
//           <div key={msg.id}>
//             {" "}
//             {/* Use msg.id as the key */}
//             <b>{msg.senderId === senderId ? "You" : "Other"}:</b> {msg.content}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;
