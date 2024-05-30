import { HiDotsHorizontal } from "react-icons/hi";

const PostCard = ({ post }) => {
  console.log(post);
  const formatDate = () => {
    const dateObject = new Date(post?.postDate);
    // Extract date components
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObject.toLocaleDateString("en-US", options);
  };

  const formatTime = () => {
    // Assuming postTime is in the format "HH:MM:SS"
    const [hours, minutes] = post.postTime.split(':');

    // Convert hours to 12-hour format and set AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours % 12) || 12).toString().padStart(2, '0'); // Convert "00" to "12"

    // Format the date and time strings
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const formattedDate = formatDate();
  const formattedTime = formatTime();

  return (
    <div className="w-full">
      <div className="flex border border-gray-300 ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 sm:pr-0 sm:px-5 py-3 hover:bg-gray-50">
        <div className="mt-3 w-12 h-12 text-lg flex-none">
          <img
            src={post?.author?.image || "https://via.placeholder.com/150"}
            className="flex-none w-12 h-12 rounded-full cursor-pointer"
            alt={post.author?.username}
          />
        </div>

        <div className="w-full px-4 py-3">
          <div className="w-full flex justify-between relative">
            <h2 className="font-semibold cursor-pointer">
              {`${post.author?.firstName} ${post.author?.lastName}`}
              <span className="text-slate-500 font-normal pl-1.5">
                {post.author?.institutionalEmail}
              </span>
            </h2>

            <HiDotsHorizontal className="cursor-pointer mr-3" />
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
    </div>
  );
};

export default PostCard;

{
  /* Post Options Modal */
}
{
  /* <div className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold absolute right-7 top-0 z-20 rounded-xl">
            <ul className="p-0.5 cursor-pointer text-start">
              <li className="my-1 p-1 hover:bg-slate-200 rounded">Edit Post</li>
              <li className="my-1 p-1 hover:bg-slate-200 rounded">Delete Post</li>
            </ul>
          </div> */
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
