"use client";

import { Navbar } from "@/components/ui/Navbar";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import WebSocketService from "@/WebSocketService";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Chat() {
    const userSession = getUserSession();

    // fetch all the students that have already been messaged by the counselor
    const students = [
        {
            id: 45,
            name: "Kathryn Melissa M. Villar",
            program: "BS Architecture",
            lastmsg: "Hello there! I've been assigned to take care of y...",
            img: "https://thispersondoesnotexist.com",
        },
        {
            id: 46,
            name: "Gilda A. Yap",
            program: "CNAHS",
            lastmsg: "Good morning! How can I help you today? I miss t...",
            img: "https://picsum.photos/200",
        },
        {
            id: 47,
            name: "Jennylyn M. Pascua",
            program: "BSME",
            lastmsg: "Good afternoon! Today was a great start for me. I...",
            img: "https://avatar.iran.liara.run/public",
        },
    ];

    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedUser, setSelectedUser] = useState(students[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState(""); // State to store input message
    const [newChat, setNewChat] = useState(false);
    const [newStudent, setNewStudent] = useState("");
    const [inputNewStudent, setInputNewStudent] = useState(""); // State to store input student name

    // to get currently logged in student
    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const response = await fetch(
                    `${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_BY_ID}${userSession.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch student profile");
                }
                const data = await response.json();
                setLoggedUser(data); // Set the current student profile
                setLoading(false);
            } catch (error) {
                console.error("Error fetching student profile: ", error);
                setLoading(false);
            }
        };

        fetchStudentProfile();
    }, [userSession.id]);

    // to get the currently selected student from chat list
    const handleSelectStudent = (student) => {
        setNewChat(false);
        setSelectedUser(student);
        fetchMessages(student.id);
    };

    // search query
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            WebSocketService.disconnect();
        };
    }, []);

    // input message
    const handleSubmitMessage = async (event) => {
        event.preventDefault();

        if (inputMessage.trim()) {
            const newMessage = {
                message: inputMessage,
                senderId: loggedUser?.id, // the currently logged in student
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
                setInputMessage(""); // Clear the input field after sending the message
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    // new student
    const handleNewStudent = (event) => {
        event.preventDefault();
        setNewStudent(inputNewStudent);
    };

    // handle first message -> add student to the list of students who have been messaged, send the message
    const handleFirstMessage = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Check if the input message is not empty
        if (inputMessage.trim()) {
            // Create a new message object
            const newMessage = {
                message: inputMessage,
                senderId: loggedUser?.id, // The currently logged-in student
                receiverId: selectedUser.id, // The selected user
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
                setInputMessage(""); // Clear the input field after sending the message
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar userType="student" />
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
                        {filteredStudents.map((student, index) => (
                            <div
                                key={student.id}
                                className={`w-full h-24 px-4 flex flex-row items-center gap-x-1.5 hover:bg-gray-100 rounded-lg cursor-pointer ${selectedUser.id === student.id ? "bg-gray-100" : ""
                                    }`}
                                onClick={() => handleSelectStudent(student)}
                            >
                                <div>
                                    <img
                                        src={student.img}
                                        alt="randomperson"
                                        className="rounded-full h-[65px] w-[65px] mx-3"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold">{student.name}</h1>
                                    <p className="text-sm text-gray-400">{student.lastmsg}</p>
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
                                        src={selectedUser.img}
                                        alt={selectedUser.name}
                                        className="rounded-full h-10 w-10"
                                    />
                                </div>
                                <h1 className="font-semibold text-lg">{selectedUser.name}</h1>
                            </div>

                            <div className="px-3 pt-3 pb-4 flex-grow flex flex-col gap-y-2 justify-end overflow-auto">
                                {/* Filter and sort messages based on recipientID */}
                                {messages
                                    .filter(
                                        (message) =>
                                            // shows sender's message on the right
                                            (message.senderId === loggedUser?.id &&
                                                message.receiverId === selectedUser.id) ||
                                            // shows recipient's message on the left
                                            (message.receiverId === loggedUser?.id &&
                                                selectedUser.id === message.senderId)
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
                                                            src={selectedUser.img}
                                                            alt={selectedUser.name}
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
                                className={`relative w-full h-10 bg-gray-100 flex items-center px-4 rounded-2xl ${!newStudent ? "opacity-50 cursor-not-allowed" : ""
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
                                    className={`absolute right-4 h-6 w-6 text-gray-500 hover:text-black grayscale hover:grayscale-0 ${!newStudent
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