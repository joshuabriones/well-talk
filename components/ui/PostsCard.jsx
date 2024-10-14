import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import { imgDB } from "@/firebaseConfig";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import { XCircleIcon } from "@heroicons/react/solid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFillImageFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { v4 } from "uuid";
import PinPostModal from "./modals/counselor/posts/PinPostModal";

const PostCard = ({ post, fetchPosts }) => {
  const [openActions, setOpenActions] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const userSession = getUserSession();
  const [openPinModal, setOpenPinModal] = useState(false);

  const isTeacherOrStudent =
    userSession.role === "teacher" || userSession.role === "student";

  const formatDate = () => {
    const dateObject = new Date(post?.postDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObject.toLocaleDateString("en-US", options);
  };

  const formatTime = () => {
    const [hours, minutes] = post.postTime.split(":");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const formattedDate = formatDate();
  const formattedTime = formatTime();

  const handlePin = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.PIN_POST}${post.postId}`,
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
        toast.error("Failed to pin post");
        return;
      }
      setOpenPinModal(false);
      toast.success("Post pinned");
      fetchPosts();
    } catch (error) {
      console.error("Error pinning post:", error);
    }
  };

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

  const handleDeletePost = async (e) => {
    e.preventDefault();
    setOpenDeleteModal(true);
  };

  const confirmDeletePost = async (e) => {
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
      setOpenDeleteModal(false);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="w-full rounded-lg bg-gray-50">
      <div className="flex border-2 rounded-lg shadow-md mb-6 ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 flex-col sm:pr-0 sm:px-5 py-2 hover:bg-gray-100 transition duration-200 ease-in-out hover:shadow-lg">
        {/* Author and Post Meta Information */}
        <div className="flex items-center mt-3 pl-4">
          <div className="w-14 h-14 flex-none ml-1">
            <img
              src={post?.author?.image || "https://via.placeholder.com/150"}
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
              post.author.institutionalEmail === userSession.email && (
                <button
                  onClick={() => setOpenActions((prev) => !prev)}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition ease-in-out duration-150"
                  aria-label="Post Actions"
                >
                  <HiDotsHorizontal className="w-5 h-5" />
                </button>
              )}

            {openActions && (
              <div className="w-36 shadow-lg bg-white border border-slate-300 text-slate-600 font-semibold absolute right-7 top-8 z-20 rounded-lg">
                <ul className="py-1 cursor-pointer text-start">
                  <li className="px-4 py-2 hover:bg-slate-200 transition-colors">
                    <button onClick={() => setOpenEditModal((prev) => !prev)}>
                      Edit Post
                    </button>
                  </li>
                  <li className="px-4 py-2 hover:bg-slate-200 transition-colors">
                    <button onClick={handleDeletePost}>Delete Post</button>
                  </li>
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
            style={{ whiteSpace: "pre-wrap" }}
          >
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

      {/* Edit Post Modal */}
      {openEditModal && (
        <EditPostModal
          content={post.postContent}
          postImage={post.postImage}
          postId={post.postId}
          setOpenEditModal={setOpenEditModal}
          fetchPosts={fetchPosts}
          setOpenActions={setOpenActions}
        />
      )}

      {/* Delete Post Modal */}
      {openDeleteModal && (
        <ModalDelete
          setDeleteModal={setOpenDeleteModal}
          handleDelete={confirmDeletePost}
          prompt="post"
        />
      )}

      {/* Pin Post Modal */}
      {openPinModal && (
        <PinPostModal
          setOpenPinModal={setOpenPinModal}
          handlePin={handlePin}
          handleUnpin={handleUnPin}
          isPinned={post.isPinned}
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
  setOpenActions,
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

    let imgUrl = image;

    if (selectedFile) {
      const imgsRef = ref(imgDB, `Postimages/${v4()}`);
      const snapshot = await uploadBytes(imgsRef, selectedFile);
      imgUrl = await getDownloadURL(snapshot.ref);
      setImage(imgUrl);
    }

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
      setOpenEditModal(false); // Change this line
      setOpenActions(false);
      toast.success("Post updated successfully");
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-2 shadow-lg w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12">
        {/* MacOS Window Title Bar */}
        <div className="flex justify-between items-center bg-maroon p-4 border-b-2 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 bg-yellow-400 rounded-full cursor-pointer"></div>
            <div className="w-4 h-4 border-2 bg-green-400 rounded-full cursor-pointer"></div>
            <div
              className="w-4 h-4 border-2 bg-red-400 rounded-full cursor-pointer"
              onClick={() => setShowModal(false)}
            ></div>
          </div>
        </div>
        <div className="p-6">
          <div className="p-4">
            <textarea
              value={postContent}
              placeholder="What's happening?"
              className="resize-none mt-3 w-full h-28 bg-white focus:outline-none focus:ring-2 focus:ring-maroon focus:border-maroon rounded-xl p-2"
              onChange={handlePostContentChange}
            ></textarea>
            <div className="max-w-full max-h-100 rounded-md relative">
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

          <div className="flex flex-row sm:flex-row justify-between items-center mb-4 px-4">
            <label className="flex items-center font-Jaldi">
              <input
                className="hidden"
                type="file"
                onChange={handleFileSelection}
                accept="image/*"
              />
              <BsFillImageFill className="text-2xl text-maroon cursor-pointer mr-2 mt-1" />
            </label>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setOpenEditModal((prev) => !prev)}
                className="w-full sm:w-auto bg-white border-2 border-maroon text-sm text-maroon font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePost}
                className="w-full sm:w-auto bg-maroon border-2 border-maroon text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
              >
                Update Post
              </button>
            </div>
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
