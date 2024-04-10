import { useState } from "react";

export default function CreateBlogSection() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [blogUrl, setBlogUrl] = useState("");
	const [author, setAuthor] = useState("");
	const [publishDate, setPublishDate] = useState("");

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleContentChange = (e) => {
		setContent(e.target.value);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	const handleBlogUrlChange = (e) => {
		setBlogUrl(e.target.value);
	};

	const handleAuthorChange = (e) => {
		setAuthor(e.target.value);
	};

	const handlePublishDateChange = (e) => {
		setPublishDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission (e.g., send data to backend, create blog)
		console.log({ title, content, image, blogUrl, author, publishDate });
		onClose();
	};

	return (
		<div>
			<div className="flex justify-between px-44 my-6">
				<h2 className="text-3xl sm:text-3xl lg:text-3xl font-Merriweather font-bold mb-2">
					Create Blog
				</h2>
			</div>

			<div className="max-w-screen-3xl h-3/5 border border-gray-300 rounded-lg px-6 py-6 mx-44 flex">
				<div className="flex-1 pr-4">
					<form
						onSubmit={handleSubmit}
						className="space-y-4">
						<div className="mb-6">
							<label
								htmlFor="title"
								className="block text-xl mb-4 font-Merriweather">
								Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								value={title}
								onChange={handleTitleChange}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 font-Merriweather"
								required
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="content"
								className="block text-xl mb-4 font-Merriweather">
								Short Description
							</label>
							<textarea
								id="content"
								name="content"
								value={content}
								onChange={handleContentChange}
								rows={2}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 font-Jaldi"
								required
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="blogUrl"
								className="block text-xl mb-4 font-Merriweather">
								Blog URL
							</label>
							<input
								type="text"
								id="blogUrl"
								name="blogUrl"
								value={blogUrl}
								onChange={handleBlogUrlChange}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 font-Merriweather"
								required
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="author"
								className="block text-xl mb-4 font-Merriweather">
								Author
							</label>
							<input
								type="text"
								id="author"
								name="author"
								value={author}
								onChange={handleAuthorChange}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 font-Merriweather"
								required
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="publishDate"
								className="block text-xl mb-4 font-Merriweather">
								Publish Date
							</label>
							<input
								type="date"
								id="publishDate"
								name="publishDate"
								value={publishDate}
								onChange={handlePublishDateChange}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 font-Merriweather mb-6"
								required
							/>
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
								onChange={handleImageChange}
								accept="image/*"
								className="hidden"
							/>
							<label
								htmlFor="image"
								className="absolute inset-0 cursor-pointer">
								<span className="bg-gray-100 h-96 flex justify-center items-center block border border-gray-300 rounded-md">
									<span className="text-gray-400">
										Click or Drag Image to Upload
									</span>
								</span>
							</label>
						</div>
					</div>
					<div className="flex justify-end mt-96">
						<button
							type="submit"
							className="w-full bg-black border-2 border-black text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300">
							Create Blog
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
