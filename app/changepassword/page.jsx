"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

//imgs
import bgChangePass from "@/public/images/bgs/bgChangePass.jpg";
import ModalChangePassword from "@/components/ui/modals/ForgotPassword/ModalChangePassword";

const ChangePassword = () => {
	const router = useRouter();

	return (
		<div
			className="min-h-screen w-full relative"
			style={{
				minHeight: "100vh",
			}}
		>
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `url(${bgChangePass.src})`,
					backgroundSize: "cover",
					backgroundPosition: "center right",
					backgroundAttachment: "fixed",
					filter: "blur(5px)",
					zIndex: -1,
				}}
			/>

			<ModalChangePassword />
		</div>
	);
};

export default ChangePassword;
