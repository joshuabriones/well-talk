"use client";

import { Navbar } from "@/components/ui/Navbar";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function Chat() {
  const userSession = getUserSession();
  const [loggedUser, setLoggedUser] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedUser, setSelectedUser] = useState();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [newStudent, setNewStudent] = useState("");
  const [inputNewStudent, setInputNewStudent] = useState("");

  const [socketMessages, setSocketMessages] = useState([]);

  // Fetch both students and teachers
  const fetchUsers = async () => {
    try {
      const studentResponse = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_STUDENTS}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const teacherResponse = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_TEACHERS}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const studentsData = await studentResponse.json();
      const teachersData = await teacherResponse.json();

      setStudents(studentsData);
      setTeachers(teachersData);
    } catch (error) {
      console.error("Error fetching students/teachers:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    setLoggedUser(userSession); // Get currently logged-in user

    const socket = new SockJS(`${process.env.BASE_URL}/ws`);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Connected to WebSocket");

      client.subscribe("/topic/messages", (msg) => {
        const newMessage = JSON.parse(msg.body);
        console.log("New message parsed to JSON:", newMessage);

        // Check if the message already exists to prevent duplicates
        setMessages((prevMessages) => {
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
  }, []);

  // Auto-select first user (student or teacher) if none is selected
  useEffect(() => {
    if (students.length > 0 && !selectedUser) {
      setSelectedUser(students[0]);
    } else if (teachers.length > 0 && !selectedUser) {
      setSelectedUser(teachers[0]);
    }
  }, [students, teachers]);

  // Fetch messages for the selected user
  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `${process.env.BASE_URL}/api/messages?senderId=${loggedUser.id}&receiverId=${selectedUser.id}`,
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
    }
  }, [selectedUser]);

  console.log(messages);

  // Select a user (student or teacher)
  const handleSelectUser = (user) => {
    setNewChat(false);
    setSelectedUser(user);
  };

  // Search query for both students and teachers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = [...students, ...teachers].filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Input message
  const handleSubmitMessage = (event) => {
    event.preventDefault();

    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        senderID: loggedUser?.id,
        recipientID: selectedUser?.id,
        timestamp: new Date().toISOString(),
      };

      console.log("New Message Data:", newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage(""); // Clear the input field after sending the message
    }
  };

  const sendMessage = () => {
    if (stompClient && message.trim() !== "") {
      const chatMessage = {
        senderId: loggedUser.id,
        receiverId: selectedUser.id,
        content: message,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  // New student
  const handleNewStudent = (event) => {
    event.preventDefault();
    setNewStudent(inputNewStudent);
  };

  // Handle first message -> Add user to chat and send the message
  const handleFirstMessage = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        senderID: loggedUser?.id,
        recipientID: selectedUser?.id,
        timestamp: new Date().toISOString(),
      };

      console.log("New Message Data:", newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInputMessage("");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar userType="counselor" />
      <div
        className="pattern-overlay pattern-left absolute -z-10"
        style={{ transform: "scaleY(-1)", top: "-50px" }}
      >
        <img src="/images/landing/lleft.png" alt="pattern" />
      </div>
      <div
        className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
        style={{ transform: "scaleY(-1)", top: "-15px" }}
      >
        <img
          src="/images/landing/lright.png"
          alt="pattern"
          className="w-full h-full object-contain"
        />
      </div>
      <section className="h-screen flex flex-col md:flex-row items-center justify-center pt-[90px] pb-10 px-4 md:px-10 lg:px-36 gap-x-4">
        {/* Chat List */}
        <section className="w-full md:w-1/3 h-full px-4 py-6 flex flex-col gap-y-3 rounded-lg border bg-white">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-Merriweather font-bold">Chats</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 hover:scale-125 cursor-pointer"
              onClick={() => setNewChat(!newChat)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>

          {/* Search Bar */}
          <div className="w-full h-10 bg-gray-100 flex flex-row items-center px-4 rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <form action="" className="w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:font-Jaldi font-Jaldi"
              />
            </form>
          </div>

          {/* List */}
          <div className="w-full flex-grow overflow-scroll">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`w-full h-24 px-4 flex flex-row items-center gap-x-1.5 hover:bg-gray-100 rounded-lg cursor-pointer ${selectedUser?.id === user.id ? "bg-gray-100" : ""
                  }`}
                onClick={() => handleSelectUser(user)}
              >
                <div>
                  <img
                    src={user.image}
                    alt="randomperson"
                    className="rounded-full h-[65px] w-[65px] mx-3"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-sm text-gray-400">{user.idNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full md:w-2/3 h-full px-4 pb-3 rounded-lg border bg-white">
          {newChat === false ? (
            <div className="w-full h-full flex flex-col justify-between">
              {/* Chat Header */}
              <div className="w-full h-16 px-3 border-b shadow-sm flex items-center gap-x-3">
                <div>
                  <img
                    src={selectedUser?.image}
                    alt={selectedUser?.firstName}
                    className="rounded-full h-10 w-10"
                  />
                </div>
                <h1 className="font-semibold text-lg">
                  {selectedUser?.firstName} {selectedUser?.lastName}
                </h1>
              </div>

              <div className="px-3 pt-3 pb-4 flex-grow flex flex-col gap-y-2 justify-end overflow-auto">
                {/* Filter and sort messages based on recipientID */}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`w-full min-h-9 flex flex-row gap-x-3 ${message.senderId === loggedUser?.id
                        ? "justify-end"
                        : "justify-start"
                      }`}
                  >
                    {message.senderId !== loggedUser?.id && (
                      <div className="flex items-end gap-x-3">
                        <div>
                          <img
                            src={selectedUser?.image}
                            alt={selectedUser?.firstName}
                            className="rounded-full h-9 w-9"
                          />
                        </div>
                        <div className="bg-silver max-w-3xl min-h-9 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2 flex items-center justify-start break-words">
                          {message.content}
                        </div>
                      </div>
                    )}
                    {message.senderId === loggedUser?.id && (
                      <div className="flex items-end gap-x-3">
                        <div className="bg-maroon max-w-3xl min-h-9 text-white rounded-tl-2xl rounded-br-2xl rounded-bl-2xl px-4 py-2 flex items-center justify-start break-words">
                          {message.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="relative w-full h-10 bg-gray-100 flex items-center px-4 rounded-2xl">
                <form className="w-full">
                  <input
                    type="text"
                    name="message"
                    placeholder="Type your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:font-Jaldi font-Jaldi"
                  />
                </form>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute right-4 h-6 w-6 text-gray-500 hover:text-black grayscale hover:grayscale-0 cursor-pointer"
                  onClick={sendMessage}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-between">
              {/* Chat Header */}
              <div className="w-full h-16 px-3 border-b shadow-sm flex items-center gap-x-3">
                <div className="w-full flex flex-row items-center">
                  <h1 className="text-sm">To:</h1>
                  {/* MISSING FUNCTION, DROP DOWN OF ALL userS */}
                  <div className="w-full">
                    <form onSubmit={handleNewStudent}>
                      <input
                        type="text"
                        name="student"
                        placeholder="Name of Student"
                        value={inputNewStudent}
                        onChange={(e) => setInputNewStudent(e.target.value)}
                        className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:font-Jaldi font-Jaldi text-lg"
                      />
                    </form>
                  </div>
                </div>
              </div>

              <div className="px-3 pt-3 pb-4 flex-grow flex flex-col gap-y-2 justify-end overflow-auto">
                <p className="font-medium text-sm text-center">Start a new chat</p>
              </div>

              {/* Message Input */}
              <div className="relative w-full h-10 bg-gray-100 flex items-center px-4 rounded-2xl">
                <form onSubmit={handleSubmitMessage} className="w-full">
                  <input
                    type="text"
                    name="message"
                    placeholder="Type your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey
                      ) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:font-Jaldi font-Jaldi"
                  />
                </form>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute right-4 h-6 w-6 text-gray-500 hover:text-black grayscale hover:grayscale-0 cursor-pointer"
                  onClick={sendMessage}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </div>
            </div>
          )}
        </section>
      </section>
    </div>

  );
}

// {
// 	/* Student */
// }
// <div className="w-full min-h-9 flex flex-row gap-x-3">
// 	<div className="flex items-end gap-x-3">
// 		<div>
// 			<img
// 				src={selectedUser.img}
// 				alt={selectedUser.name}
// 				className="rounded-full h-9 w-9"
// 			/>
// 		</div>
// 		<div className="bg-emerald-200 max-w-3xl min-h-9 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl px-5 py-2 flex items-center justify-start break-words">
// 			The wheels on bus go round and round, round and round, round and round. The wheels on
// 			bus go round and round, all through the town. I mean, why would you even ask that? It's
// 			so obvious. The wheels on the bus go round and round, round and round, round and round.
// 		</div>
// 	</div>
// 	<div className="flex items-center">
// 		<svg
// 			xmlns="http://www.w3.org/2000/svg"
// 			fill="none"
// 			viewBox="0 0 24 24"
// 			strokeWidth={1.5}
// 			stroke="currentColor"
// 			className="size-5 text-transparent hover:text-black hover:cursor-pointer"
// 		>
// 			<path
// 				strokeLinecap="round"
// 				strokeLinejoin="round"
// 				d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
// 			/>
// 		</svg>
// 	</div>
// </div>;
