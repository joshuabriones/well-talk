import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../../../css/blogimg.css";
import ViewPost from "../../modals/ViewPost";
import EditPost from "./EditPost"; // Import EditPost component

const CounselorBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false); // State variable to control edit dialog visibility

  useEffect(() => {
    fetchPosts();
    console.log("Posts:", posts);
  }, []);

  console.log("Is edit dialog showing?", showEditDialog);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/viewallposts"
      );
      setPosts(response.data);
      console;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleReadMoreClick = (postId) => {
    setSelectedPostId(postId);
    setShowPost(true);
  };

  const handleClosePost = () => {
    setShowPost(false);
  };

  const handleEditPost = (postId) => {
    console.log("Editing post with ID:", postId);
    setSelectedPostId(postId); // Set the selected post ID

    setShowEditDialog(true); // Show the edit dialog
    console.log("dscxfdcx", showEditDialog);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `/api/users/counselor/deletepost/${postId}`
      );
      console.log("Post deleted successfully");
      fetchPosts(); // Refresh posts after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <section className="mx-8">
      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div key={post.postId} className="blog-post py-3">
              <div
                className="image-zoom"
                style={{ maxWidth: "100%", height: "auto" }}
              >
                <a href="blog-single.html" className="blog-img">
                  <img
                    src={post.image}
                    alt=""
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </a>
              </div>
              <div className="pt-8">
                <span className="blog-date uppercase font-Jaldi">
                  by <b>{post.author}</b> on {formatDate(post.datePosted)}
                </span>
              </div>
              <div>
                <h3 className="py-5">
                  <a
                    href="blog-single.html"
                    className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="pb-10 font-Jaldi">{post.shortDescription}</p>
                <div className="flex">
                  <button
                    onClick={() => handleReadMoreClick(post.postId)}
                    className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out mr-2"
                  >
                    Read More
                  </button>
                  <button
                    onClick={() => handleEditPost(post.postId)}
                    className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out mr-2"
                  >
                    <PencilIcon className="h-5 w-5 inline-block" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.postId)}
                    className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out mr-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <ViewPost postId={selectedPostId} onClose={handleClosePost} />
          </div>
        </div>
      )}
      {showEditDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <EditPost
              post={posts.find((post) => post.postId === selectedPostId)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CounselorBlogs;
