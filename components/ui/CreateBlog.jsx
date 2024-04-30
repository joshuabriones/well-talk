"use client";
import { imgDB } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import AuthorInput from "./inputs/InputAuthor";
import TitleInput from "./inputs/InputBlogTitle";
import BlogURLInput from "./inputs/InputBlogURL";
import PublishDateInput from "./inputs/InputPublishDate";
import ShortDecriptionInput from "./inputs/InputShortDescription";

export default function CreateBlogSection() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [title, setTitle] = useState("");
	const [shortDescription, setShortDescription] = useState("");
	const [image, setImage] = useState("null");
	const [blogURL, setBlogUrl] = useState("");
	const [author, setAuthor] = useState("");
	const [publishDate, setPublishDate] = useState("");

	const handleFileSelection = (e) => {
		setSelectedFile(e.target.files[0]);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (selectedFile) {
				const imgsRef = ref(imgDB, `Postimages/${v4()}`);
				const snapshot = await uploadBytes(imgsRef, selectedFile);
				const imgUrl = await getDownloadURL(snapshot.ref);
				setImage(imgUrl);

				const response = await fetch(
					"/api/users/counselor/createpost",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							title: title,
							shortDescription: shortDescription,
							blogURL: blogURL,
							author: author,
							publishDate: publishDate,
							image: imgUrl, // Add the image URL to the request body
						}),
					}
				);

				if (response.ok) {
					const data = await response.json();
					console.log("Success:", data);
					// Handle success (e.g., show success message, redirect, etc.)
				} else {
					console.error(
						"Failed to create blog:",
						response.statusText
					);
					// Handle error (e.g., show error message, retry logic, etc.)
				}
			} else {
				console.error("No file selected");
				// Handle case where no file is selected
			}
		} catch (error) {
			console.error("Error in creating blog:", error);
			// Handle network error or other exceptions
		}
	};
	return (
		<div>
			<div className="flex justify-between px-44 my-6">
				<h2 className="text-3xl sm:text-3xl lg:text-3xl font-Merriweather font-bold mb-2">
					Create Blog
				</h2>
			</div>

			<div className="max-w-screen-3xl border border-gray-300 rounded-lg px-6 py-6 mx-44 flex">
				<div className="flex-1 pr-4">
					<form onSubmit={() => {}}>
						<div className="flex flex-col gap-y-2.5 py-4">
							<div className="w-full flex flex-row gap-x-6">
								<TitleInput
									title={title}
									setTitle={setTitle}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-y-2.5 py-4">
							<div className="w-full flex flex-row gap-x-6">
								<ShortDecriptionInput
									shortDescription={shortDescription}
									setShortDescription={setShortDescription}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-y-2.5 py-4">
							<div className="w-full flex flex-row gap-x-6">
								<BlogURLInput
									blogURL={blogURL}
									setBlogURL={setBlogUrl}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-y-2.5 py-4">
							<div className="w-full flex flex-row gap-x-6">
								<AuthorInput
									author={author}
									setAuthor={setAuthor}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-y-2.5 py-4">
							<div className="w-full flex flex-row gap-x-6">
								<PublishDateInput
									publishDate={publishDate}
									setPublishDate={setPublishDate}
								/>
							</div>
						</div>
					</form>
				</div>

				<div className="flex-1 pl-4">
					<div className="mb-4">
						<label
							htmlFor="content"
							className="block text-xl mb-4 font-Merriweather">
							Upload Image
						</label>
						<div className=" px-3 py-2 mb-12 text-center relative">
							<input
								type="file"
								id="image"
								name="image"
								onChange={handleFileSelection}
								accept="image/*"
								className="hidden"
							/>
							<label
								htmlFor="image"
								className="absolute inset-0 cursor-pointer">
								<span className="bg-gray-100 h-96 flex justify-center items-center block border border-gray-300 rounded-md">
									{image ? (
										<image
											src={image}
											alt="Uploaded Image"
											height="200px"
											width="200px"
										/>
									) : (
										<span className="text-gray-400">
											Click or Drag Image to Upload
										</span>
									)}
								</span>
							</label>
						</div>
					</div>
					<div className="flex justify-end mt-96">
						<button
							type="submit"
							className="w-full bg-black border-2 border-black text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
							onClick={handleSubmit}>
							Create Blog
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
