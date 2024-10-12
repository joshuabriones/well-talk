import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const ChatWidget = () => {
	const userSession = getUserSession();
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("people");
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [counselors, setCounselors] = useState([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [stompClient, setStompClient] = useState(null);

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const toggleChat = () => {
		setIsChatOpen(!isChatOpen);
	};

	const openConversation = (person) => {
		setSelectedPerson(person);
		setActiveTab("conversation");
	};

	const goBackToPeopleList = () => {
		setActiveTab("people");
		setSelectedPerson(null);
	};

	// const fetchCounselors = async () => {
	//   const response = await fetch(
	//     `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_COUNSELORS}`,
	//     {
	//       method: "GET",
	//       headers: {
	//         "Content-Type": "application/json",
	//         Authorization: `Bearer ${Cookies.get("token")}`,
	//       },
	//     }
	//   );
	//   const data = await response.json();
	//   setCounselors(
	//     data.filter((counselor) => counselor.college === loggedInUser?.college)
	//   );
	// };

	const fetchCounselors = async () => {
		let apiEndpoint = "";

		// Determine the appropriate endpoint based on the user role
		if (userSession.role === "student") {
			apiEndpoint = `${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_STUDENT_ID}${userSession.id}`;
		} else if (userSession.role === "teacher") {
			apiEndpoint = `${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_TEACHER_ID}${userSession.id}`;
		}

		// Fetch counselors based on the user role
		const response = await fetch(apiEndpoint, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${Cookies.get("token")}`,
			},
		});

		try {
			if (!response.ok) {
			  throw new Error(`HTTP error! Status: ${response.status}`);
			}
		  
			const data = await response.json();

			if (data) {
			  setCounselors(data);
			} else {
			  console.warn("No data returned from the server.");
			}
		  
		  } catch (error) {
			console.error("Error fetching counselors:", error);
		  }

		// Fetch additional counselors based on receiver ID if there are messages
		const receiverResponse = await fetch(
			`${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_RECEIVER_ID}${userSession.id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}
		);

		if (receiverResponse.ok) {
			const receiverData = await receiverResponse.json();
			setCounselors((prevCounselors) => [
				...prevCounselors,
				...receiverData.filter(
					(counselor) =>
						!prevCounselors.some(
							(prevCounselor) => prevCounselor.id === counselor.id
						)
				),
			]);
		}
	};

	const fetchLoggedInUserDetails = async () => {
		let apiEndpoint = "";

		// Check if the logged-in user is a student or a teacher
		if (userSession.role === "student") {
			apiEndpoint = `${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_BY_ID}${userSession.id}`;
		} else if (userSession.role === "teacher") {
			apiEndpoint = `${process.env.BASE_URL}${API_ENDPOINT.GET_TEACHER_BY_ID}${userSession.id}`;
		}

		// Fetch user details from the appropriate endpoint
		const response = await fetch(apiEndpoint, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${Cookies.get("token")}`,
			},
		});

		const text = await response.text();
		const data = text ? JSON.parse(text) : {};
		setLoggedInUser(data);
	};

	const sendMessage = () => {
		if (stompClient && message.trim() !== "") {
			const chatMessage = {
				senderId: loggedInUser.id,
				receiverId: selectedPerson.id,
				content: message,
			};
			stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
			setMessage("");
		}
	};

	useEffect(() => {
		fetchLoggedInUserDetails();

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
	}, []);

	useEffect(() => {
		fetchCounselors();
	}, [loggedInUser]);

	useEffect(() => {
		if (selectedPerson) {
			// Fetch all previous messages when the component mounts
			const fetchMessages = async () => {
				try {
					const response = await fetch(
						`${process.env.BASE_URL}/api/messages?senderId=${loggedInUser.id}&receiverId=${selectedPerson.id}`,
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
	}, [selectedPerson]);

	return (
		<div className="fixed bottom-8 right-4 md:right-8 lg:right-8 z-50">
			{!isChatOpen ? (
				<motion.img
					src="/images/chat.png"
					className="w-16 h-16 rounded-2xl cursor-pointer"
					onClick={toggleChat}
					alt="chat icon"
					initial={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					transition={{ type: "spring", stiffness: 300 }}
				/>
			) : (
				<motion.div
					className="w-16 h-16 rounded-full bg-maroon text-white border-2 border-black flex items-center justify-center cursor-pointer"
					onClick={toggleChat}
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.5, opacity: 0 }}
					transition={{ type: "spring", stiffness: 300 }}>
					<CloseIcon fontSize="large" />
				</motion.div>
			)}

			{/* CHAT BOPX */}
			<div
				id="chatBox"
				className={`fixed bottom-28 right-4 md:right-8 lg:right-8 w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-md h-[60vh] bg-white border-2 rounded-2xl shadow-lg flex flex-col transition-all duration-300 ${
					isChatOpen ? "opacity-100 visible" : "opacity-0 invisible"
				}`}>
				{/* CHAT HEADER */}
				<div className="flex-none bg-maroon text-white uppercase p-4 rounded-t-xl relative">
					{activeTab === "conversation" && selectedPerson ? (
						<div className="flex items-center">
							<button
								onClick={goBackToPeopleList}
								className="absolute left-4 top-5 flex items-center justify-center">
								<ArrowBackIcon fontSize="medium" />
							</button>
							{/* COUNSEL AVA NAME */}
							<div className="ml-10 flex items-center space-x-2">
								<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold">
									<img
										src={selectedPerson.image}
										alt={`${selectedPerson.firstName}'s Avatar`}
									/>
								</div>
								<h1 className="text-sm font-semibold">
									{selectedPerson.firstName}{" "}
									{selectedPerson.lastName}
								</h1>
							</div>
						</div>
					) : (
						<div className="flex flex-col items-start">
							{/* WELLTALK LOGO DIRI */}
							<div className="flex items-center">
								<img
									src="/images/loggoword.png"
									alt="Logo"
									className="w-10 h-10 mr-2"
								/>
								<h1 className="font-bold text-sm flex items-center">
									Chat Support
								</h1>
							</div>
						</div>
					)}
				</div>

				{/* CONVO */}
				{activeTab === "people" ? (
					<div className="flex-1 overflow-y-auto p-3 text-white text-opacity-50 ml-2 space-y-4 mt-4">
						{counselors.map((person) => (
							<div
								key={person.id}
								className="flex items-center space-x-2 cursor-pointer"
								onClick={() => openConversation(person)}>
								<div className="w-8 h-8 rounded-full overflow-hidden border border-white border-opacity-50">
									<img
										src={person.image}
										alt={`${person.firstName} Avatar`}
									/>
								</div>
								<div>
									<p className="text-sm text-gray">
										{person.firstName} {person.lastName}
									</p>
									<p className="text-xs text-gray text-opacity-50">
										{person.idNumber}
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="flex-1 overflow-y-auto p-3 text-white text-opacity-50 space-y-4 mt-4">
						{messages.map((msg) => (
							<div
								key={msg.id}
								className={`flex ${
									msg.senderId === loggedInUser.id
										? "justify-end"
										: ""
								}`}>
								<div
									className={`relative text-xs rounded-lg p-2 ${
										msg.senderId === loggedInUser.id
											? "bg-gold text-gray"
											: "bg-silver text-gray"
									}`}>
									<p>{msg.content}</p>
								</div>
							</div>
						))}
					</div>
				)}

				{activeTab === "conversation" && selectedPerson && (
					<div className="flex-none p-2 border-t rounded-b-2xl relative">
						<div className="flex items-center">
							<div className="flex-1 relative">
								<label className="relative block rounded-full bg-white border border-gray-400 p-2 shadow-sm focus-within:border-maroon focus-within:ring-1 focus-within:ring-maroon">
									<textarea
										value={message}
										onChange={handleMessageChange}
										onKeyDown={(event) => {
											if (
												event.key === "Enter" &&
												!event.shiftKey
											) {
												event.preventDefault();
												sendMessage();
											}
										}}
										className="peer border-none bg-white placeholder-transparent focus:border-gray-800 focus:outline-none focus:ring-0 rounded-2xl w-full h-4 resize-none"
										placeholder="Type your message..."
										required
									/>
								</label>
							</div>
							<button
								className="ml-2"
								onClick={sendMessage}>
								<img
									src="/images/sendicon.png"
									alt="Send"
									className="w-8 h-8 cursor-pointer"
								/>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatWidget;
