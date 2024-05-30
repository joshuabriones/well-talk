"use client";

import Image from "next/image";

const Blog = ({ params }) => {
  // const { blogId } = useParams();
  console.log(params.blogId);
  return <div className="w-full h-screen bg-slate-700"></div>;
};

export default Blog;
