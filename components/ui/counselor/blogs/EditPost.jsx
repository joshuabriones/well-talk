import { useState } from "react";

const EditPost = ({ post }) => {
  // Initialize states for each field with the existing post data
  const [title, setTitle] = useState(post.title);
  const [shortDescription, setShortDescription] = useState(
    post.shortDescription
  );
  const [blogURL, setBlogUrl] = useState(post.blogURL);
  const [author, setAuthor] = useState(post.author);
  const [publishDate, setPublishDate] = useState(post.publishDate);
  console.log("editing");

  const handleSave = (e) => {
    e.preventDefault();
    // Handle saving the updated post data
    const updatedPost = {
      title,
      shortDescription,
      blogURL,
      author,
      publishDate,
      // You may need to include other fields here if there are more attributes
    };
    // Perform actions to save the updated post data
    console.log("Updated post data:", updatedPost);
  };

  return (
    <dialog id="edit-post" className="modal">
      <div className="modal-box w-1/3 bg-white max-w-4xl flex flex-col">
        <h3 className="p-5 border-b-2 font-light text-black text-2xl text-center">
          Edit Blog
        </h3>
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered input-md w-full max-w-4xl bg-white mt-10"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Short Description"
            className="textarea textarea-bordered textarea-md w-full max-w-4xl bg-white mt-5"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Blog URL"
            className="input input-bordered input-md w-full max-w-4xl bg-white mt-5"
            value={blogURL}
            onChange={(e) => setBlogUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            className="input input-bordered input-md w-full max-w-4xl bg-white mt-5"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Publish Date"
            className="input input-bordered input-md w-full max-w-4xl bg-white mt-5"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
          <div className="modal-action mt-10">
            <button type="button" className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditPost;
