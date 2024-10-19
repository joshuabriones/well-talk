"use client";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaThumbtack } from 'react-icons/fa';
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import PinPostModal from "./modals/counselor/posts/PinPostModal";
import toast from "react-hot-toast";

const PinnedPost = ({ post, userSession }) => {
	const [openActions, setOpenActions] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
	console.log(userSession);

  const handleUnPin = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.UNPIN_POST}${post.postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            postContent: post.postContent,
            postImage: post.postImage,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to unpin post");
        return;
      }
      setOpenPinModal(false);
      toast.success("Post unpinned");
      fetchPosts();
    } catch (error) {
      console.error("Error pinning post:", error);
    }
  };

	const isTeacherOrStudent =
		userSession.role === "teacher" || userSession.role === "student";

	const formatDate = () => {
		const dateObject = new Date(post?.postDate);
		// Extract date components
		const options = { year: "numeric", month: "long", day: "numeric" };
		return dateObject.toLocaleDateString("en-US", options);
	};

	const formatTime = () => {
		// Assuming postTime is in the format "HH:MM:SS"
		const [hours, minutes] = post.postTime.split(":");

		// Convert hours to 12-hour format and set AM/PM
		const ampm = hours >= 12 ? "PM" : "AM";
		const formattedHours = (hours % 12 || 12).toString().padStart(2, "0"); // Convert "00" to "12"

		// Format the date and time strings
		return `${formattedHours}:${minutes} ${ampm}`;
	};

	const formattedDate = formatDate();
	const formattedTime = formatTime();

	return (
		<div className="w-full rounded-lg bg-gray-50">
       <div className="flex flex-row gap-2 mb-4 ml-2">
          <FaThumbtack />
          <span className="ml-1 text-md font-semibold">Pinned Post</span>
          </div>
			<div className="flex border-2 border-yellow-400 rounded-lg bg-yellow-50 shadow-md mb-6 ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 flex-col sm:pr-0 sm:px-5 py-2 hover:bg-gray-100 transition duration-200 ease-in-out hover:shadow-lg">
				{/* Author and Post Meta Information */}
				<div className="flex items-center mt-3 pl-4">
					<div className="w-14 h-14 flex-none ml-1">
						<img
							src={
								post?.author?.image ||
								"https://via.placeholder.com/150"
							}
							className="w-14 h-14 rounded-full border-2 border-maroon cursor-pointer hover:shadow-md transition-transform duration-150 hover:scale-105"
							alt={post?.author?.username || "Author Avatar"}
						/>
					</div>

					<div className="w-full pl-4">
						<h2 className="font-semibold text-sm md:text-md lg:text-md cursor-pointer flex flex-row text-gray-800 hover:underline">
							{`${post.author?.firstName} ${post.author?.lastName}`}
							<span className="hidden md:block lg:block text-slate-500 font-normal pl-2">
								• {post.author?.institutionalEmail}
							</span>
						</h2>
						<div className="flex justify-between items-center mt-1">
							<p className="text-slate-500 font-light text-xs md:text-md">
								{formattedDate} {formattedTime}
							</p>
						</div>
					</div>

					{/* Post Actions Dropdown */}
					<div className="flex justify-end items-center w-auto pr-4 relative">
						{!isTeacherOrStudent &&
							post.author.institutionalEmail ===
								userSession.email && (
								<button
									onClick={() =>
										setOpenActions((prev) => !prev)
									}
									className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition ease-in-out duration-150"
									aria-label="Post Actions">
									<HiDotsHorizontal className="w-5 h-5" />
								</button>
							)}

						{openActions && (
							<div className="w-36 shadow-lg bg-white border border-slate-300 text-slate-600 font-semibold absolute right-7 top-8 z-20 rounded-lg">
								<ul className="py-1 cursor-pointer text-start">
									<li className="px-4 py-2 hover:bg-slate-200 transition-colors">
                  <button onClick={() => setOpenPinModal(true)}>
                  {post.isPinned ? "Unpin Post" : "Pin Post"}
										</button>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>

				{/* Post Content */}
				<div className="w-full px-3 py-2">
					<p
						className="pl-2 md:pl-20 lg:pl-20 mb-4 mr-2 text-gray-700 w-full md:w-full lg:w-11/12 break-words leading-relaxed text-base sm:text-base md:text-md lg:text-lg"
						style={{ whiteSpace: "pre-wrap" }}>
						{post?.postContent}
					</p>

					{post?.postImage && (
						<div className="max-w-full max-h-80 rounded-md flex justify-center md:justify-center cursor-pointer">
							<img
								src={post?.postImage}
								className="max-w-full max-h-80 rounded-md shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
								alt="Post Image"
							/>
						</div>
					)}
				</div>
			</div>

      {openPinModal && (
        <PinPostModal
          setOpenPinModal={setOpenPinModal}
          handleUnpin={handleUnPin}
          isPinned={post.isPinned}
        />
      )}

			{/* Edit Modal */}
			{openEditModal && (
				<EditPostModal
					content={post.postContent}
					postImage={post.postImage}
					postId={post.postId}
					setOpenEditModal={setOpenEditModal}
				/>
			)}

			{/* Delete Modal */}
			{openDeleteModal && (
				<ModalDelete
					setDeleteModal={setOpenDeleteModal}
					prompt="delete"
					handleDelete={() => console.log("Delete Post")}
				/>
			)}
		</div>
	);
};

export default PinnedPost;
