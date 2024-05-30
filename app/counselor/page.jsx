"use client";
import { default as Load, default as LoadingState } from "@/components/Load";
import Card from "@/components/ui/Card";
import CreatePostSection from "@/components/ui/CreatePost";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/lib/api";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState("featured");
  const [posts, setPosts] = useState([]);
  const [showFilterPostModal, setShowFilterModal] = useState(false);
  const [sortPostBy, setSortPostBy] = useState("Latest");
  const [loading, setLoading] = useState(true);
  const userSession = getUserSession();
  const router = useRouter();

  // to be removed
  const { data: session, status } = useSession();

  /* Handling unauthenticated users */
  if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
    return <Load route="login" />;
  }

  if (userSession && userSession.role !== "counselor") {
    return <Load route={userSession.role} />;
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_POSTS}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
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

  // if (status === "loading" || !session) {
  // 	return <Loading />;
  // }

  // Redirect authenticated users who are not students
  // if (session.user.role !== "student") {
  // 	router.push("/login");
  // 	return null; // Prevent rendering anything if redirecting
  // }


  // const getSortedPosts = () => {
  //   if (!Array.isArray(posts)) {
  //     return [];
  //   }
  
  //   return [...posts].sort((a, b) => {
  //     // Combine date and time into a full ISO 8601 timestamp string
  //     const dateTimeA = new Date(`${a.postDate}T${a.postTime}`);
  //     const dateTimeB = new Date(`${b.postDate}T${b.postTime}`);
      
  //     if (sortPostBy === "Latest") {
  //       // Sort by latest date and time first
  //       return dateTimeB - dateTimeA;
  //     } else if (sortPostBy === "Oldest") {
  //       // Sort by oldest date and time first
  //       return dateTimeA - dateTimeB;
  //     } else {
  //       // If no sort order is specified, return the posts unsorted
  //       return posts;
  //     }
  //   });
  // };
  

  // const sortedPosts = getSortedPosts();

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
        {/*Posts*/}
        <div className="flex flex-col md:flex-row py-24 px-4 md:px-12">
          <div className="max-w-screen-xl mx-auto sm:px-12 lg:px-14 w-full md:w-11/12 flex flex-col">
            <div className="max-w-8xl mx-auto px-5 flex flex-col w-full">
              <div className="flex flex-col  flex-grow items-start my-6">
                <h1 className="text-2xl md:text-3xl font-Merriweather font-bold">
                  {sortPostBy} Posts
                </h1>
                <p className="font-Jaldi text-xl sm:text-base">
                  Check out the latest posts from the university's Guidance
                  Counselor!
                </p>
              </div>
              {/* <div className="ml-auto relative">
								<GiSettingsKnobs
									className="fill-black stroke-0 hover:stroke-2 text-2xl cursor-pointer text-center"
									onClick={() =>
										setShowFilterModal((prev) => !prev)
									}
								/>
								{showFilterPostModal && (
									<div className="absolute w-30 h-22 px-1 shadow-xl bg-slate-100 border border-slate-300 text-slate-600 font-semibold right-0 top-7 z-20 rounded-xl">
										<ul className="p-2 cursor-pointer text-start">
											<li
												className="p-1 hover:bg-slate-200 rounded"
												onClick={() => {
													setSortPostBy("Latest");
													setShowFilterModal(false);
												}}>
												Latest
											</li>
											<li
												className="p-1 hover:bg-slate-200 rounded"
												onClick={() => {
													setSortPostBy("Oldest");
													setShowFilterModal(false);
												}}>
												Oldest
											</li>
										</ul>
									</div>
								)}
							</div> */}
            </div>
            <div className="w-full p-2 mx-auto flex-grow max-h-[90vh] overflow-y-auto">
              {loading ? (
                <LoadingState />
              ) : (
                <CreatePostSection userSession={userSession} />
              )}
            </div>
          </div>
          {/*Blogs*/}
          <div className="max-w-screen-xl mx-auto sm:px-12 lg:px-14 flex-grow-2 w-full">
            <div className="flex flex-col px-4 flex-grow-1 items-start my-6">
              <h1 className="text-2xl md:text-3xl font-Merriweather font-bold">
                Editor's Picks
              </h1>
              <p className="font-Jaldi text-xl sm:text-base">
                Check out the latest posts from the university's Guidance
                Counselor!
              </p>
            </div>
            <div className="w-full mx-auto flex-grow max-h-[90vh] overflow-y-auto">
              <Card />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

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
