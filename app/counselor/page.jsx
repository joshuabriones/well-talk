"use client";
import { default as LoadingState } from "@/components/Load";
import CreatePostSection from "@/components/ui/CreatePost";
import FloatingIcon from "@/components/ui/emergency/FloatingIcon";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import PostCard from "@/components/ui/PostsCard";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PinnedPost from "@/components/ui/PinnedPost";

const Home = () => {
  const [selectedButton, setSelectedButton] = useState("featured");
  const [posts, setPosts] = useState([]);
  const [showFilterPostModal, setShowFilterModal] = useState(false);
  const [sortPostBy, setSortPostBy] = useState("Latest");
  const [loading, setLoading] = useState(true);
  const userSession = getUserSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Latest"); // Set default tab to 'Latest'

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter pinned posts
  const pinnedPosts = posts.filter((post) => post.isPinned);

  return (
    <div>
      <main className="min-h-screen">
        <Navbar userType="counselor" />

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

        {/* Posts Section */}

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

            <div className="w-full mx-auto flex-grow items-center">
              {loading ? (
                <LoadingState />
              ) : (
                <>
                  <div className="w-11/12 ml-6 md:ml-12 lg:ml-12">
                    <CreatePostSection
                      userSession={userSession}
                      fetchPosts={fetchPosts}
                    />
                  </div>

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
                          <PostCard
                            key={post.postId}
                            post={post}
                            fetchPosts={fetchPosts}
                          />
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
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
        <FloatingIcon />
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });

// "use client";

// import React, { useEffect, useState } from 'react';
// import { FaGraduationCap, FaBriefcase, FaUser } from 'react-icons/fa';
// import AppointmentTable from '@/components/ui/counselor/dashboard/AppointmentTable';
// import ReferralTable from '@/components/ui/counselor/dashboard/ReferralTable';
// import InquiryTable from '@/components/ui/counselor/dashboard/InquiryTable';

// const Dashboard = () => {
//   const [data, setData] = useState({
//     students: 0,
//     teachers: 0,
//     counselors: 0,
//     appointments: [],
//     referrals: [],
//     inquiries: [],
//   });
//   const [currentPageInquiries, setCurrentPageInquiries] = useState(1);
//   const [currentPageReferrals, setCurrentPageReferrals] = useState(1);
//   const inquiriesPerPage = 5;
//   const referralsPerPage = 5;

//   useEffect(() => {
//     // Fetch data from your API or database
//     // Example:
//     // fetchData().then(response => setData(response));

//     // Placeholder data
//     setData({
//       students: 11985,
//       teachers: 234,
//       counselors: 56,
//       appointments: [
//         { id: 1, student: { firstName: 'Olivia', lastName: 'Rhye', idNumber: 'S001', institutionalEmail: 'olivia@untitledui.com', image: 'https://via.placeholder.com/30' }, dateTime: '2024-05-20 10:00 - 11:00', purpose: 'Headache', status: true },
//         { id: 2, student: { firstName: 'Phoenix', lastName: 'Baker', idNumber: 'S002', institutionalEmail: 'phoenix@untitledui.com', image: 'https://via.placeholder.com/30' }, dateTime: '2024-05-20 11:00 - 12:00', purpose: 'Bully', status: false },
//         { id: 3, student: { firstName: 'Lana', lastName: 'Steiner', idNumber: 'S003', institutionalEmail: 'lana@untitledui.com', image: 'https://via.placeholder.com/30' }, dateTime: '2024-05-20 12:00 - 13:00', purpose: 'Mommy issues', status: null },
//         { id: 4, student: { firstName: 'Demi', lastName: 'Wilkinson', idNumber: 'S004', institutionalEmail: 'demi@untitledui.com', image: 'https://via.placeholder.com/30' }, dateTime: '2024-05-20 13:00 - 14:00', purpose: 'Daddy issues', status: null },
//       ],
//       referrals: [
//         { id: 1, student: { firstName: 'Olivia', lastName: 'Rhye', institutionalEmail: 'olivia@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 10:00 - 11:00', reason: 'Schizophrenia' },
//         { id: 2, student: { firstName: 'Phoenix', lastName: 'Baker', institutionalEmail: 'pnix@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 11:00 - 12:00', reason: 'Bipolarity' },
//         { id: 3, student: { firstName: 'Lana', lastName: 'Steiner', institutionalEmail: 'lana@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 12:00 - 13:00', reason: 'Multiple Personality' },
//         { id: 4, student: { firstName: 'Demi', lastName: 'Wilkinson', institutionalEmail: 'demi@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 13:00 - 14:00', reason: 'Parkinson’s' },
//         { id: 5, student: { firstName: 'Candice', lastName: 'Wu', institutionalEmail: 'candix@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 14:00 - 15:00', reason: 'Homosexuality' },
//       ],
//       inquiries: [
//         { id: 1, student: { firstName: 'Olivia', lastName: 'Rhye', institutionalEmail: 'olivia@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 10:00 - 11:00', subject: 'Career Counseling', status: 'open' },
//         { id: 2, student: { firstName: 'Phoenix', lastName: 'Baker', institutionalEmail: 'pnix@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 11:00 - 12:00', subject: 'I am dying', status: 'closed' },
//         { id: 3, student: { firstName: 'Lana', lastName: 'Steiner', institutionalEmail: 'lana@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 12:00 - 13:00', subject: 'Please help me', status: 'open' },
//         { id: 4, student: { firstName: 'Demi', lastName: 'Wilkinson', institutionalEmail: 'demi@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 13:00 - 14:00', subject: 'Handling Emotions', status: 'closed' },
//         { id: 5, student: { firstName: 'Candice', lastName: 'Wu', institutionalEmail: 'candix@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 14:00 - 15:00', subject: 'Ariana Grande', status: 'open' },
//       ],
//     });
//   }, []);

//   const handleRowClick = (inquiryId) => {
//     console.log(`Inquiry ID clicked: ${inquiryId}`);
//   };

//   const showDeleteModal = (inquiryId) => {
//     console.log(`Delete modal for Inquiry ID: ${inquiryId}`);
//   };

//   const currentInquiries = data.inquiries.slice((currentPageInquiries - 1) * inquiriesPerPage, currentPageInquiries * inquiriesPerPage);
//   const currentReferrals = data.referrals.slice((currentPageReferrals - 1) * referralsPerPage, currentPageReferrals * referralsPerPage);

//   return (
//     <div className="p-6 flex flex-row space-y-6 min-h-screen w-full">
//       <div className="flex flex-col gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
//           <p className="text-3xl font-semibold">{data.students}</p>
//           <div className="flex items-center text-gray-600 mt-2">
//             <FaGraduationCap className="mr-2 text-green-600" />
//             <p>Students</p>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
//           <p className="text-3xl font-semibold">{data.teachers}</p>
//           <div className="flex items-center text-gray-600 mt-2">
//             <FaBriefcase className="mr-2 text-green-600" />
//             <p>Teachers</p>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
//           <p className="text-3xl font-semibold">{data.counselors}</p>
//           <div className="flex items-center text-gray-600 mt-2">
//             <FaUser className="mr-2 text-green-600" />
//             <p>Counselors</p>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col">
//             {/* Appointment Table */}
//             <AppointmentTable
//         data={data}
//         // Pass other necessary props
//       />
//       <div className="flex flex-row gap-6">
//       {/* Referral Table */}
//       <ReferralTable
//         data={data}
//         currentReferrals={currentReferrals}
//         // Pass other necessary props
//       />

//       {/* Inquiry Table */}
//       <InquiryTable
//         data={data}
//         currentPageInquiries={currentPageInquiries}
//         setCurrentPageInquiries={setCurrentPageInquiries}
//         inquiriesPerPage={inquiriesPerPage}
//         currentReferrals={currentReferrals}
//         setCurrentPageReferrals={setCurrentPageReferrals}
//         referralsPerPage={referralsPerPage}
//         handleRowClick={handleRowClick}
//         showDeleteModal={showDeleteModal}
//         // Pass other necessary props
//       />
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
