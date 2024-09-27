import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useState } from "react";

const ChatWidget = () => {
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("people");
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const handleSendMessage = () => {
		if (message.trim()) {
			setMessages((prevMessages) => [
				...prevMessages,
				{ sender: "me", text: message },
			]);
			setMessage("");
		}
	};

	const toggleChat = () => {
		setIsChatOpen(!isChatOpen);
	};

	const people = [
		{
			id: 1,
			name: "John Doe",
			status: "Available",
			avatar: "https://via.placeholder.com/150",
		},
		{
			id: 2,
			name: "Jane Smith",
			status: "Busy",
			avatar: "https://via.placeholder.com/150",
		},
	];

	const openConversation = (person) => {
		setSelectedPerson(person);
		setActiveTab("conversation");
	};

	const goBackToPeopleList = () => {
		setActiveTab("people");
		setSelectedPerson(null);
	};

	return (
		<div className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
		  {!isChatOpen ? (
			<motion.img
			  src="/images/chat.png"
			  className="w-12 h-12 md:w-16 md:h-16 rounded-2xl cursor-pointer"
			  onClick={toggleChat}
			  alt="chat icon"
			  initial={{ scale: 1 }}
			  whileHover={{ scale: 1.1 }}
			  transition={{ type: "spring", stiffness: 300 }}
			/>
		  ) : (
			<motion.div
			  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-maroon text-white flex items-center justify-center cursor-pointer"
			  onClick={toggleChat}
			  initial={{ scale: 0.5, opacity: 0 }}
			  animate={{ scale: 1, opacity: 1 }}
			  exit={{ scale: 0.5, opacity: 0 }}
			  transition={{ type: "spring", stiffness: 300 }}
			>
			  <CloseIcon fontSize="large" />
			</motion.div>
		  )}
	  
		  {/* CHAT BOX */}
		  <div
			id="chatBox"
			className={`fixed bottom-24 right-4 md:bottom-28 md:right-8 w-full max-w-sm md:w-96 h-[70vh] md:h-[80vh] max-h-[500px] bg-white border-2 rounded-2xl shadow-lg flex flex-col transition-all duration-300 ${
			  isChatOpen ? "opacity-100 visible" : "opacity-0 invisible"
			}`}
		  >
			{/* CHAT HEADER */}
			<div className="flex-none bg-maroon text-white uppercase p-3 md:p-4 rounded-t-2xl relative">
			  {activeTab === "conversation" && selectedPerson ? (
				<div className="flex items-center">
				  <button
					onClick={goBackToPeopleList}
					className="absolute left-2 top-3 md:left-4 md:top-5 flex items-center justify-center"
				  >
					{/* Use Tailwind for icon size */}
					<ArrowBackIcon className="text-sm md:text-base" />
				  </button>
				  {/* COUNSEL AVA NAME */}
				  <div className="ml-8 md:ml-10 flex items-center space-x-2">
					<div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border border-white">
					  <img
						src={selectedPerson.avatar}
						alt={`${selectedPerson.name}'s Avatar`}
					  />
					</div>
					<h1 className="text-xs md:text-sm font-semibold">
					  {selectedPerson.name}
					</h1>
				  </div>
				</div>
			  ) : (
				<div className="relative flex items-center">
				  {/* WELLTALK LOGO */}
				  <img
					src="/images/loggoword.png"
					alt="Logo"
					className="w-8 h-8 md:w-10 md:h-10 mr-2"
				  />
				  <h1 className="font-bold text-xs md:text-sm">Chat Support</h1>
				</div>
			  )}
			</div>
	  
			{/* CONVO */}
			{activeTab === "people" ? (
			  <div className="flex-1 overflow-y-auto p-2 md:p-3 text-gray text-opacity-50 space-y-4 mt-4">
				{people.map((person) => (
				  <div
					key={person.id}
					className="flex items-center space-x-2 cursor-pointer"
					onClick={() => openConversation(person)}
				  >
					<div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border border-white border-opacity-50">
					  <img src={person.avatar} alt={`${person.name} Avatar`} />
					</div>
					<div>
					  <p className="text-xs md:text-sm text-gray">{person.name}</p>
					  <p className="text-xs text-gray text-opacity-50">
						{person.status}
					  </p>
					</div>
				  </div>
				))}
			  </div>
			) : (
			  <div className="flex-1 overflow-y-auto p-2 md:p-3 text-gray text-opacity-50 space-y-4 mt-4">
				{messages.map((msg, index) => (
				  <div
					key={index}
					className={`flex ${msg.sender === "me" ? "justify-end" : ""}`}
				  >
					<div
					  className={`relative text-xs rounded-lg p-2 ${
						msg.sender === "me"
						  ? "bg-maroon text-white"
						  : "bg-silver text-gray"
					  }`}
					>
					  <p>{msg.text}</p>
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
						  if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							handleSendMessage();
						  }
						}}
						className="peer border-none bg-white placeholder-transparent focus:border-gray-800 focus:outline-none focus:ring-0 rounded-2xl w-full h-4 resize-none"
						placeholder="Type your message..."
						required
					  />
					</label>
				  </div>
				  <button className="ml-2" onClick={handleSendMessage}>
					<img
					  src="/images/sendicon.png"
					  alt="Send"
					  className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
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
