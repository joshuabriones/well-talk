"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { BsFillImageFill } from "react-icons/bs";
import PostCard from "./PostsCard";
import FullButton from "./buttons/FullButton";
import { imgDB } from "@/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const CreatePostSection = () => {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/users/viewallposts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const postHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users/counselor/createpost", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.id,
          postContent: postContent,
          image: image,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to post");
      }
      const data = await response.json();
      console.log(data);
      setPostContent("");
      setSelectedFile(null);
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleFileSelection = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgsRef = ref(imgDB, `Postimages/${v4()}`);
      const snapshot = await uploadBytesResumable(imgsRef, file);
      const imgUrl = await getDownloadURL(snapshot.ref);
      setImage(imgUrl);
      setSelectedFile(file); // Set the file after the image URL is obtained
    }
  };

  const removeImage = () => {
    setImage(""); // Clear the image state
    setSelectedFile(null); // Clear the selected file state
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex items-center">
        <img
          src={session?.user.image}
          alt="User Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold font-Jaldi cursor-pointer">
          {session?.user.name}{" "}
          <span className="text-slate-500 font-Jaldi pl-1.5">
            {session?.user.email}
          </span>
        </span>
      </div>
      <div className="bg-white focus:outline-none rounded-xl overflow-hidden mt-4">
        <textarea
          value={postContent}
          placeholder="What's happening?"
          className="resize-none mt-3 pb-3 w-full h-28 bg-white focus:outline-none rounded-xl p-2"
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        {image && (
          <div className="relative mt-3">
            <img
              src={image}
              alt="Uploaded Content"
              className="w-80 h-100 object-cover"
            />
            {/* Remove button positioned at top right */}
            <button
              onClick={removeImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              X
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 mb-4">
        {!selectedFile && (
          <label className="flex items-center font-Jaldi">
            <input
              className="hidden"
              type="file"
              onChange={handleFileSelection}
              x
              accept="image/*"
            />
            <BsFillImageFill className="text-xl cursor-pointer mr-2" />
            Add Image
          </label>
        )}
        <div className="flex justify-end w-48">
          <FullButton disabled={!postContent.trim()} onClick={postHandler}>
            Post
          </FullButton>
        </div>
      </div>

      {/* Conditional rendering based on posts array */}
      {posts.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">
          No posts yet. Come back later.
        </p>
      ) : (
        posts.map((post) => <PostCard key={post.postId} post={post} />)
      )}
    </div>
  );
};

export default CreatePostSection;
