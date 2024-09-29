// CreatePost.js
"use client";
import { imgDB } from "@/firebaseConfig";
import { API_ENDPOINT } from "@/lib/api";
import { XCircleIcon } from "@heroicons/react/solid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsFillImageFill } from "react-icons/bs";
import { v4 } from "uuid";
import "../../css/custom-progress.css";

const CreatePost = ({ userSession, fetchPosts }) => {
	const [postContent, setPostContent] = useState("");
	const [image, setImage] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [characterCount, setCharacterCount] = useState(0);
	const [userData, setUserData] = useState(null);

	const fetchUserData = async () => {
		if (userSession.role === "counselor") {
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
				console.error("Failed to fetch user data");
				return;
			}

			const data = await response.json();
			setUserData(data);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, [userSession]);

	const postHandler = async (e) => {
		e.preventDefault();

		const user = JSON.parse(Cookies.get("user"));
		let imgUrl = "";

		if (selectedFile) {
			const imgsRef = ref(imgDB, `Postimages/${v4()}`);
			const snapshot = await uploadBytes(imgsRef, selectedFile);
			imgUrl = await getDownloadURL(snapshot.ref);
			setImage(imgUrl);
		}

		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.CREATE_POST}?counselorId=${user.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						userId: user.id,
						postContent: postContent,
						postImage: imgUrl,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to post");
			}

			setPostContent("");
			setSelectedFile(null);
			setImage(null);
			fetchPosts();
		} catch (error) {
			console.error("Error posting:", error);
		}
	};

	const handleFileSelection = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
		const objectUrl = URL.createObjectURL(file);
		setImage(objectUrl);
	};

	const removeImage = () => {
		URL.revokeObjectURL(image);
		setImage("");
		setSelectedFile(null);
	};

	useEffect(() => {
		setCharacterCount(postContent.length);
	}, [postContent]);

	const remainingCharacters = 280 - characterCount;
	const getColor = () => {
		if (remainingCharacters <= 20 && remainingCharacters > 5) {
			return "#FFD700"; // Yellow
		} else if (remainingCharacters <= 5) {
			return "#e60000"; // Red
		} else {
			return "#6B9080"; // Default
		}
	};

	const handlePostContentChange = (e) => {
		const value = e.target.value;
		if (value.length <= 280) {
			setPostContent(value);
			setCharacterCount(value.length);
		}
	};

	return (
		<div className="border-b">
			<div className="flex items-center">
				<img
					src={userData?.image}
					alt="User Profile"
					className="w-10 h-10 rounded-full mr-3"
				/>
				<span className="font-semibold flex flex-col font-Jaldi cursor-pointer">
					{userData?.firstName} {userData?.lastName}
					<span className="text-slate-500 font-Jaldi">
						{userSession?.email}
					</span>
				</span>
			</div>
			<div className="w-full px-2">
				<textarea
					value={postContent}
					placeholder="What's happening?"
					className="resize-none mt-3 pb-3 w-full h-28 bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green rounded-xl p-2"
					onChange={handlePostContentChange}></textarea>
				<div className="max-w-xl max-h-100 rounded-md relative">
					{image && (
						<>
							<img
								src={image}
								alt="Uploaded Content"
								className="object-cover max-w-full max-h-32 rounded-md my-2 cursor-pointer"
							/>
							<button
								onClick={removeImage}
								className="absolute top-0 left-[-2] bg-red-500 text-white rounded-full"
								style={{
									marginTop: "-5px",
									marginRight: "-5px",
								}}>
								<XCircleIcon className="h-5 w-5" />
							</button>
						</>
					)}
				</div>
			</div>

			<div className="flex justify-between items-center mt-2 mb-4 px-4">
				<label className="flex items-center font-Jaldi">
					<input
						className="hidden"
						type="file"
						onChange={handleFileSelection}
						accept="image/*"
					/>
					<BsFillImageFill className="text-maroon text-2xl cursor-pointer mr-2 mt-1" />
				</label>

				<div className="disabled:cursor-not-allowed pt-3 flex justify-end gap-4 w-40">
					<div className="flex flex-row justify-center items-center relative w-12">
						{characterCount <= 289 && (
							<CircularProgressbar
								value={characterCount}
								maxValue={280}
								text={
									remainingCharacters <= 20
										? `${remainingCharacters}`
										: null
								}
								strokeWidth={11}
								styles={buildStyles({
									textColor: getColor(),
									pathColor: getColor(),
									textSize: "40px",
								})}
								className={`custom-progress-bar ${
									characterCount > 289 ? "hidden" : ""
								}`}
							/>
						)}

						{characterCount > 289 && (
							<div
								className="custom-progress-text"
								style={{
									fontSize: "13px",
									color: "red",
									transition: "opacity 0.5s ease-out",
									opacity: characterCount > 289 ? 1 : 0,
								}}>
								{remainingCharacters}
							</div>
						)}
					</div>
					<button
						className={`w-full py-2 text-lg font-semibold font-Merriweather rounded-full transition-colors duration-300 
        ${
			!postContent.trim() || characterCount > 280
				? "bg-maroon text-white cursor-not-allowed border-silver border-2"
				: "bg-gold text-gray hover:bg-gold-dark border-2"
		}`}
						disabled={!postContent.trim() || characterCount > 280}
						onClick={postHandler}>
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
