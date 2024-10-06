"use client";
import { default as LoadingState } from "@/components/Load";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import PostCard from "@/components/ui/PostsCard";
import FloatingIcon from "@/components/ui/emergency/FloatingIcon";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PinnedPost from "@/components/ui/PinnedPost";

function Home() {
  const [selectedButton, setSelectedButton] = useState("featured");
  const [posts, setPosts] = useState([]);
  const [showFilterPostModal, setShowFilterModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userSession = getUserSession();
  const [activeTab, setActiveTab] = useState("Latest");
  const [pinnedPosts, setPinnedPosts] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {}, [activeTab]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_POSTS}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
      setPosts(data.filter((post) => !post.isPinned));
      setPinnedPosts(data.filter((post) => post.isPinned));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };
  /* Handling unauthenticated users */
  // if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
  //   return <Load route="login" />;
  // }

  // if (userSession && userSession.role !== "student") {
  //   return <Load route={userSession.role} />;
  // }

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <main className="min-h-screen">
        <Navbar userType="student" />

        <div
          className="pattern-overlay pattern-left absolute -z-10"
          style={{ transform: "scaleY(-1)", top: "-50px" }}
        >
          <img src="/images/landing/lleft.png" alt="pattern" />
        </div>
        <div
          className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
          style={{ transform: "scaleY(-1)", top: "-15px" }}
        >
          <img
            src="/images/landing/lright.png"
            alt="pattern"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Posts */}
        <div className="flex flex-col md:flex-row py-28 px-4 md:px-12">
          {/* Posts Section */}
          <div className="md:block max-w-screen-xl md:max-w-5xl mx-auto sm:px-12 lg:px-14 w-full flex-grow-2 justify-center items-center">
            <div
              className={`bg-maroon border-2 rounded-lg z-10 flex justify-center mx-5 ml-5 md:ml-7 lg:ml-7 sticky md:static top-18`}
            >
              <div className="flex w-full justify-center">
                <button
                  onClick={() => handleTabClick("Latest")}
                  className={`w-full sm:w-full py-1 text-lg font-semibold font-Merriweather rounded-l-lg transition-colors duration-300 ${
                    activeTab === "Latest"
                      ? "bg-gold text-gray"
                      : "text-white hover:text-gold"
                  }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => handleTabClick("Pinned")}
                  className={`w-full sm:w-full py-1 text-lg font-semibold font-Merriweather rounded-r-lg transition-colors duration-300 ${
                    activeTab === "Pinned"
                      ? "bg-gold text-gray"
                      : "text-white hover:text-gold"
                  }`}
                >
                  Pinned
                </button>
              </div>
            </div>

            {/* Posts Content 
						<div className="max-w-8xl mx-auto px-5 flex w-full">
							<div className="flex flex-col flex-grow-1 items-start my-6">
								<h1 className="text-2xl md:text-3xl font-Merriweather font-bold">
									{activeTab === "Latest"
										? "Latest Posts"
										: "Pinned Posts"}
								</h1>
								<p className="font-Jaldi text-xl sm:text-base">
									{activeTab === "Latest"
										? "Check out the latest posts from the university's Guidance Counselor!"
										: "Here are the pinned posts for quick reference!"}
								</p>
							</div>
						</div>*/}

            {/* Conditional Rendering of Posts */}
            <div className="w-full p-2 px-4 mx-auto flex-grow mt-4">
              {loading ? (
                <LoadingState />
              ) : activeTab === "Latest" ? (
                posts.length === 0 ? (
                  <p className="text-center mt-4 text-gray-500">
                    No posts yet. Come back later.
                  </p>
                ) : (
                  posts.map((post) => (
                    <PostCard key={post.postId} post={post} />
                  ))
                )
              ) : pinnedPosts.length === 0 ? (
                <p className="text-center mt-4 text-gray-500">
                  No pinned posts available.
                </p>
              ) : (
                pinnedPosts.map((post) => (
                  <PinnedPost
                    key={post.postId}
                    post={post}
                    userSession={userSession}
                  />
                ))
              )}
            </div>
          </div>

          {/* Editor's Picks Section */}
          {/*<div className="max-w-screen-lg mx-auto rounded-xl border border-silver bg-white sm:px-8 lg:px-10 max-h-[45vh] flex-grow-1 w-full md:w-3/12">
						<div className="flex flex-col flex-grow-1 items-start my-4">
							<h1 className="text-lg md:text-xl font-Merriweather font-bold">
								Editor's Picks
							</h1>
							<p className="font-Jaldi text-sm sm:text-xs">
								Check out the latest picks from the university's
								Guidance Counselor!
							</p>
						</div>
						<hr />
						<div className="w-full mx-auto bg-white flex-grow max-h-[30vh] overflow-y-auto mt-3">
							<Card />
						</div>
					</div>*/}
        </div>
      </main>

      <Footer />
      <FloatingIcon />
    </div>
  );
}
export default dynamic(() => Promise.resolve(Home), { ssr: false });
