import { HiDotsHorizontal } from "react-icons/hi";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";
import { BsFillImageFill } from "react-icons/bs";
import { XCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDB } from "@/firebaseConfig";
import { v4 } from "uuid";
import { getUserSession } from "@/lib/helperFunctions";

const PostCard = ({ post, fetchPosts }) => {
  console.log(post);
  const [openActions, setOpenActions] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const userSession = getUserSession();
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

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.DELETE_POST}${post.postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex border border-gray-300 ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 sm:pr-0 sm:px-5 py-3 hover:bg-gray-50">
        <div className="mt-3 w-12 h-12 text-lg flex-none">
          <img
            src={post?.author?.image || "https://via.placeholder.com/150"}
            className="flex-none w-12 h-12 rounded-full cursor-pointer"
            alt={post.author?.username}
          />
        </div>

        <div className="w-full px-4 py-3">
          <div className="w-full flex justify-between relative text-lg">
            <h2 className="font-semibold cursor-pointer ">
              {`${post.author?.firstName} ${post.author?.lastName}`}
              <span className="text-slate-500 font-normal pl-1.5">
                {post.author?.institutionalEmail}
              </span>
            </h2>

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
                    <button onClick={handleDeletePost}>Delete Post</button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <p className="py-3 cursor-pointer max-w-lg break-words">
            {post?.postContent}
          </p>

          {post?.postImage && (
            <div className="max-w-3xl max-h-80 mx-auto rounded-md cursor-pointer">
              <img
                src={post?.postImage}
                className="max-w-full max-h-80 rounded-md my-2 mx-auto"
                alt="avatar"
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
      {openEditModal && (
        <EditPostModal
          content={post.postContent}
          postImage={post.postImage}
          postId={post.postId}
          setOpenEditModal={setOpenEditModal}
          fetchPosts={fetchPosts}
        />
      )}
    </div>
  );
};

export default PostCard;

function EditPostModal({
  content,
  postImage,
  postId,
  setOpenEditModal,
  fetchPosts,
}) {
  const [postContent, setPostContent] = useState(content);
  const [image, setImage] = useState(postImage || "");
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePostContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 280) {
      setPostContent(value);
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

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    if (image === "") {
      alert("Please select an image to upload");
    }

    if (selectedFile) {
      const imgsRef = ref(imgDB, `Postimages/${v4()}`);
      const snapshot = await uploadBytes(imgsRef, selectedFile);
      const imgUrl = await getDownloadURL(snapshot.ref);

      setImage(imgUrl);
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.UPDATE_POST}${postId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({
              postContent: postContent,
              postImage: imgUrl,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to post");
        }

        const data = await response.json();

        setPostContent("");
        setSelectedFile(null);
        setImage(null);
        fetchPosts();
      } catch (error) {
        console.error("Error posting:", error);
      }
    } else {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.UPDATE_POST}${postId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({
              postContent: postContent,
              postImage: image,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to post");
        }

        const data = await response.json();

        setPostContent("");
        setSelectedFile(null);
        setImage(null);
        fetchPosts();
      } catch (error) {
        console.error("Error posting:", error);
      }
    }
  };

  return (
    <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 z-50">
      <div className="w-1/2 h-[55%] px-4 font-Merriweather bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-xl">
        <h2 className="text-center font-semibold text-xl py-3 border-b border-gray-300">
          Edit Post
        </h2>
        <div className="w-full px-4 py-3">
          <textarea
            value={postContent}
            placeholder="What's happening?"
            className="resize-none mt-3 pb-3 w-full h-28 bg-white focus:outline-none rounded-xl p-2"
            onChange={handlePostContentChange}
          ></textarea>
          <div className="max-w-xl max-h-100  rounded-md relative">
            {image && (
              <>
                <img
                  src={image}
                  alt="Uploaded Content"
                  className="object-cover max-w-full max-h-32 rounded-md my-2 cursor-pointer"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-0 left-[-2] bg-red-500 text-white rounded-full "
                  style={{
                    marginTop: "-5px",
                    marginRight: "-5px",
                  }}
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 mb-4 px-4">
          <label className="flex items-center font-Jaldi">
            <input
              className="hidden"
              type="file"
              onChange={handleFileSelection}
              x
              accept="image/*"
            />
            <BsFillImageFill className="text-2xl cursor-pointer mr-2 mt-1" />
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setOpenEditModal((prev) => !prev)}
              className="bg-white border-[1px] border-black text-black px-4 py-2 rounded-md font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdatePost}
              className="bg-green-500 px-4 py-2 rounded-md font-semibold"
            >
              Update Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="flex justify-between pt-8">
          <div className="flex">
            <BsSuitHeart className="text-xl cursor-pointer" />
            <span className="text-sm pl-4 font-semibold">Like Count Placeholder</span>
          </div>

          <div className="flex">
            <GoComment className="text-xl cursor-pointer" />
            <span className="text-sm pl-4 font-semibold">Comment Count Placeholder</span>
          </div>

          <MdOutlineBookmarkBorder className="text-xl cursor-pointer mr-3" />
        </div> */
}
