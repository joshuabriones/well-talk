"use client";

import { Navbar } from "@/components/ui/Navbar";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import WebSocketService from "@/WebSocketService";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Chat() {
    const userSession = getUserSession();

    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [newChat, setNewChat] = useState(false);
    const [newUser, setNewUser] = useState("");
    const [inputNewUser, setInputNewUser] = useState("");
    const [verifiedUsers, setVerifiedUsers] = useState([]);

    // Fetch all verified users
    useEffect(() => {
        const fetchVerifiedUsers = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_VERIFIED_USERS}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch verified users");
                }
                const data = await response.json();
                setVerifiedUsers(data);
            } catch (error) {
                console.error("Error fetching verified users: ", error);
            }
        };

        fetchVerifiedUsers();
    }, []);

    // Fetch the currently logged-in counselor
    useEffect(() => {
        const fetchCounselorProfile = async () => {
            try {
                const response = await fetch(
                    `${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_ID}${userSession.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch counselor profile");
                }
                const data = await response.json();
                setLoggedUser(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching counselor profile: ", error);
                setLoading(false);
            }
        };

        fetchCounselorProfile();
    }, [userSession.id]);

    // Select a verified user from the chat list
    const handleSelectUser = (user) => {
        setNewChat(false);
        setSelectedUser(user);
        fetchMessages(user.id);
    };

    // Search query
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredUsers = verifiedUsers.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fetch messages from the server
    const fetchMessages = async (receiverId) => {
        try {
            const response = await fetch(
                `${process.env.BASE_URL}${API_ENDPOINT.GET_MESSAGES}${loggedUser.id}/${receiverId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages: ", error);
        }
    };

    // WebSocket connection
    useEffect(() => {
        WebSocketService.connect((message) => {
            console.log('New message received: ', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            WebSocketService.disconnect();
        };
    }, []);

    // Submit message
    const handleSubmitMessage = async (event) => {
        event.preventDefault();

        if (inputMessage.trim()) {
            const newMessage = {
                message: inputMessage,
                senderId: loggedUser?.id,
                receiverId: selectedUser.id,
            };

            try {
                const response = await fetch(`${process.env.BASE_URL}${API_ENDPOINT.SEND_MESSAGE}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                    body: JSON.stringify(newMessage),
                });

                if (!response.ok) {
                    throw new Error("Failed to send message");
                }

                const savedMessage = await response.json();
                WebSocketService.sendMessage(savedMessage);
                setInputMessage("");
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    // New user
    const handleNewUser = (event) => {
        event.preventDefault();
        setNewUser(inputNewUser);
    };

    // Handle first message -> add user to the list of users who have been messaged, send the message
    const handleFirstMessage = async (event) => {
        event.preventDefault();

        if (inputMessage.trim()) {
            const newMessage = {
                message: inputMessage,
                senderId: loggedUser?.id,
                receiverId: selectedUser.id,
            };

            try {
                const response = await fetch(`${process.env.BASE_URL}${API_ENDPOINT.SEND_MESSAGE}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                    body: JSON.stringify(newMessage),
                });

                if (!response.ok) {
                    throw new Error("Failed to send message");
                }

                const savedMessage = await response.json();
                WebSocketService.sendMessage(savedMessage);
                setInputMessage("");
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar userType="counselor" />
            <section className="h-screen flex flex-row items-center justify-center pt-[90px] pb-10 px-36 gap-x-4">
                {/* Chat List */}
                <section className="w-1/3 h-full px-7 py-6 flex flex-col gap-y-3 rounded-lg border bg-white">
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
                        {filteredUsers.map((user, index) => (
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
                                    <h1 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h1>
                                    <p className="text-sm text-gray-400">{user.program}</p>
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
                                <h1 className="font-semibold text-lg">{`${selectedUser?.firstName} ${selectedUser?.lastName}`}</h1>
                            </div>

                            <div className="px-3 pt-3 pb-4 flex-grow flex flex-col gap-y-2 justify-end overflow-auto">
                                {/* Filter and sort messages based on recipientID */}
                                {messages
                                    .filter(
                                        (message) =>
                                            // shows sender's message on the right
                                            (message.senderId === loggedUser?.id &&
                                                message.receiverId === selectedUser?.id) ||
                                            // shows recipient's message on the left
                                            (message.receiverId === loggedUser?.id &&
                                                selectedUser?.id === message.senderId)
                                    )
                                    // Sort messages by timestamp (ascending order)
                                    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                                    .map((message, index) => (
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
                                                    <div className="bg-emerald-200 max-w-3xl min-h-9 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2 flex items-center justify-start break-words">
                                                        {message.message}
                                                    </div>
                                                </div>
                                            )}
                                            {message.senderId === loggedUser?.id && (
                                                <div className="flex items-end gap-x-3">
                                                    <div className="bg-emerald-200 max-w-3xl min-h-9 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl px-4 py-2 flex items-center justify-start break-words">
                                                        {message.message}
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
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
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
                                    onClick={handleSubmitMessage}
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
                                    {/* MISSING FUNCTION, DROP DOWN OF ALL USERS */}
                                    <div className="w-full">
                                        <form onSubmit={handleNewUser}>
                                            <input
                                                type="text"
                                                name="user"
                                                placeholder="Name of User"
                                                value={inputNewUser}
                                                onChange={(e) => setInputNewUser(e.target.value)}
                                                className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:font-Jaldi font-Jaldi text-lg"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="px-3 pt-3 pb-4 flex-grow flex flex-col gap-y-2 justify-end overflow-auto">
                                {newUser ? (
                                    <div>
                                        <div>Start talking to connect with them!</div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>

                            {/* Message Input */}
                            <div
                                className={`relative w-full h-10 bg-gray-100 flex items-center px-4 rounded-2xl ${!newUser ? "opacity-50 cursor-not-allowed" : ""
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
                                        disabled={!newUser}
                                    />
                                </form>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`absolute right-4 h-6 w-6 text-gray-500 hover:text-black grayscale hover:grayscale-0 ${!newUser
                                        ? "cursor-not-allowed opacity-50"
                                        : "cursor-pointer"
                                        }`}
                                    onClick={
                                        newUser ? handleFirstMessage : (e) => e.preventDefault()
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
