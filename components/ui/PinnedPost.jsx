"use client";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaThumbtack } from "react-icons/fa"; // For the pin icon
import React, { useState } from "react";

const PinnedPost = ({ post, userSession }) => {
  console.log("usersessuin", userSession);
  const [openActions, setOpenActions] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
    <div className="w-full mt-4">
      <div className="relative flex border border-yellow-400 bg-yellow-50 ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 rounded-2xl flex-col sm:pr-0 sm:px-5 py-3 hover:bg-yellow-100">
        {/* Pin Badge */}
        <div className="absolute top-0 right-0 mr-4 mt-2 text-yellow-600">
          <FaThumbtack />
          <span className="ml-1 text-sm font-semibold">Pinned</span>
        </div>

        <div className="flex items-center mt-3 pl-4">
          <div className="w-12 h-12 text-lg flex-none">
            <img
              src={post?.author?.image || "https://via.placeholder.com/150"}
              className="w-12 h-12 rounded-full cursor-pointer"
              alt={post.author?.username}
            />
          </div>

          <div className="w-full pl-4">
            <h2 className="font-semibold font-Merriweather cursor-pointer">
              {`${post.author?.firstName} ${post.author?.lastName}`}
              <span className="text-slate-500 font-normal font-Jaldi pl-1.5">
                • {post.author?.institutionalEmail}
              </span>
            </h2>
          </div>
        </div>

        <div className="w-full px-4 py-3">
          <div className="w-full flex justify-between relative text-lg">
            {!isTeacherOrStudent &&
              post.author.institutionalEmail === userSession.email && (
                <button
                  onClick={() => setOpenActions((prev) => !prev)}
                  className="mr-3"
                >
                  <HiDotsHorizontal />
                </button>
              )}
            {openActions && (
              <div className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold absolute right-7 top-0 z-20 rounded-xl">
                <ul className="p-0.5 cursor-pointer text-start">
                  <li className="my-1 p-1 hover:bg-slate-200 rounded">
                    <button onClick={() => setOpenEditModal((prev) => !prev)}>
                      Edit Post
                    </button>
                  </li>
                  <li className="my-1 p-1 hover:bg-slate-200 rounded">
                    <button onClick={() => setOpenDeleteModal(true)}>
                      Delete Post
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Pinned Post Content (Partial) */}
          <p className="py-3 cursor-pointer max-w-lg break-words">
            {post?.postContent.slice(0, 100)}... {/* Truncated content */}
          </p>

          {/* Image */}
          {post?.postImage && (
            <div className="max-w-3xl max-h-60 rounded-md flex md:justify-start md:items-left cursor-pointer">
              <img
                src={post?.postImage}
                className="max-w-full max-h-60 rounded-md my-2 mx-auto"
                alt="post-image"
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              {formattedDate} {formattedTime}
            </p>
          </div>
        </div>
      </div>

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
          handleDelete={() => console.log("Delete Post")}
        />
      )}
    </div>
  );
};

export default PinnedPost;
