"use client";

import { Navbar } from "@/components/ui/Navbar";
import { getUserSession } from "@/lib/helperFunctions";
import { API_ENDPOINT } from "@/lib/api";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [newStudent, setNewStudent] = useState("");
  const [inputNewStudent, setInputNewStudent] = useState("");

  const [socketMessages, setSocketMessages] = useState([]);

  const fetchStudents = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_STUDENTS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
    setLoggedUser(userSession); // to get currently logged in student

    const socket = new SockJS("http://localhost:8080/ws");
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
  }, []);

  useEffect(() => {
    if (students.length > 0 && !selectedUser) {
      setSelectedUser(students[0]);
    }
  }, [students]);

  useEffect(() => {
    if (selectedUser) {
      // Fetch all previous messages when the component mounts
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/messages?senderId=${loggedUser.id}&receiverId=${selectedUser.id}`,
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

  // to get the currently selected student from chat list
  const handleSelectStudent = (student) => {
    setNewChat(false);
    setSelectedUser(student);
  };

  // search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // input message
  const handleSubmitMessage = (event) => {
    event.preventDefault();

    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        senderID: loggedUser?.id, // the currently logged in student
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

  // new student
  const handleNewStudent = (event) => {
    event.preventDefault();
    setNewStudent(inputNewStudent);
  };

  // handle first message -> add student to the list of students who have been messaged, send the message >>> TO BE CHECKED!!!
  const handleFirstMessage = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if the input message is not empty
    if (inputMessage.trim()) {
      // Create a new message object
      const newMessage = {
        text: inputMessage,
        senderID: loggedUser?.id, // The currently logged-in student
        recipientID: selectedUser?.id, // The selected user
        timestamp: new Date().toISOString(),
      };

      console.log("New Message Data:", newMessage);

      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Optionally, add the selected user to a list of students who have been messaged
      // Example: addToMessagedStudents(selectedUser.id);

      // Clear the input field after sending the message
      setInputMessage("");
    }
  };

  return (
    <div className="min-h-screen  ">
      <Navbar userType="counselor" />
      <section className="h-screen flex flex-row items-center justify-center pt-[90px] pb-10 px-36 gap-x-4">
        {/* Chat List */}
        <section className="w-1/3 h-full px-7 py-6 flex flex-col gap-y-3 rounded-lg border bg-white">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-Merriweather font-bold ">Chats</h1>
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
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className={`w-full h-24 px-4 flex flex-row items-center gap-x-1.5 hover:bg-gray-100 rounded-lg cursor-pointer ${
                  selectedUser?.id === student.id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleSelectStudent(student)}
              >
                <div>
                  <img
                    src={student.image}
                    alt="randomperson"
                    className="rounded-full h-[65px] w-[65px] mx-3"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">
                    {student.firstName} {student.lastName}
                  </h1>
                  <p className="text-sm text-gray-400">{student.idNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-2/3 h-full px-3 pb-3 rounded-lg border bg-white">
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
                    className={`w-full min-h-9 flex flex-row gap-x-3 ${
                      message.senderId === loggedUser?.id
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
                        <div className="bg-maroon max-w-3xl min-h-9 text-white  rounded-tl-2xl rounded-br-2xl rounded-bl-2xl px-4 py-2 flex items-center justify-start break-words">
                          {message.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
                    // value={inputMessage}
                    // onChange={(e) => setInputMessage(e.target.value)}
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
                  {/* MISSING FUNCTION, DROP DOWN OF ALL STUDENTS */}
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
                {newStudent ? (
                  <div>
                    <div>Start talking to connect with them!</div>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {/* Message Input */}
              <div
                className={`relative w-full h-10 bg-gray-100 flex items-center px-4 rounded-2xl ${
                  !newStudent ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <form onSubmit={handleFirstMessage} className="w-full">
                  <input
                    type="text"
                    name="message"
                    placeholder="Type your message here"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:font-Jaldi font-Jaldi"
                    disabled={!newStudent}
                  />
                </form>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`absolute right-4 h-6 w-6 text-gray-500 hover:text-black grayscale hover:grayscale-0 ${
                    !newStudent
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  onClick={
                    newStudent ? handleFirstMessage : (e) => e.preventDefault()
                  }
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