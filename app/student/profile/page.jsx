"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { Navbar } from "@/components/ui/Navbar";
import FullButton from "@/components/ui/buttons/FullButton";

import UpdateProfileModal from "@/components/ui/modals/student/UpdateProfileModal";
import Birthdate from "@/components/ui/student/Birthdate";
import TextDisplay from "@/components/ui/student/TextDisplay";

export default function StudentProfile() {
	const [showModal, setShowModal] = useState(false);
	const { data: session } = useSession();
	console.log(session);

	const handleUpdateProfile = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<section>
				<Navbar userType="student" />
			</section>

			<section className="mt-20 px-72 py-20">
				<section className="w-full h-fit flex flex-row items-center gap-x-10">
					{/* Main Identification */}
					<div className="w-2/12 h-full flex items-center avatar">
						<div className="w-48 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-2">
							<img src={session?.user.image} />
						</div>
					</div>
					<div className=" w-10/12 h-full flex flex-col justify-center">
						<h1 className="font-Merriweather text-4xl font-thin tracking-tight">
							Hello, {session?.user.name}
						</h1>
						<p className="font-Merriweather tracking-tight font-thin my-2">
							{session?.user.email}
						</p>
						<div className="w-2/12 mt-1">
							<FullButton onClick={handleUpdateProfile}>
								Update Profile
							</FullButton>
						</div>
					</div>
				</section>

				{/* Profile Details */}
				<section className="flex flex-col gap-y-10 py-16">
					{/* Name */}
					<div>
						<div className="w-full flex flex-row gap-x-6">
							<div className="w-5/12">
								<TextDisplay
									label="First Name"
									value={session?.user.name}
								/>
							</div>
							<div className="w-5/12">
								<TextDisplay
									label="Last Name"
									value={session?.user.lastname}
								/>
							</div>
							<div className="w-2/12">
								<TextDisplay
									label="Gender"
									value={session?.user.gender}
								/>
							</div>
						</div>
					</div>

					{/* College Information */}
					<div>
						<div className="w-full flex flex-row gap-x-6">
							<div className="w-5/12">
								<TextDisplay
									label="ID Number"
									value={session?.user.idNumber}
								/>
							</div>
							<div className="w-5/12">
								<TextDisplay
									label="Program"
									value={session?.user.program}
								/>
							</div>
							<div className="w-2/12">
								<TextDisplay
									label="Year Level"
									value={session?.user.year}
								/>
							</div>
						</div>
					</div>

					{/* Additional Details */}
					<div>
						<div className="w-full flex flex-row gap-x-6">
							<div className="w-3/12">
								<Birthdate value="2023-05-16" />
							</div>
							<div className="w-3/12">
								<TextDisplay
									label="Contact Number"
									value={session?.user.program}
								/>
							</div>
							<div className="w-6/12">
								<TextDisplay
									label="Address"
									value={session?.user.year}
								/>
							</div>
						</div>
					</div>
				</section>
			</section>

			{showModal && <UpdateProfileModal onClose={handleCloseModal} />}
		</div>
	);
}
