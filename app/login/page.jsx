"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//imgs
import loginBg from "@/public/images/loginBg.png";

// utils
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import TextInput from "@/components/ui/inputs/TextInput";

// modals
import ModalForgotPassword from "@/components/ui/modals/ForgotPassword/ModalForgotPassword";

const Login = () => {
	const router = useRouter();

	const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// forgot password
	const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
	const [showForgotPasswordModal, setShowForgotPasswordModal] =
		useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				console.log("Login successful:");
				router.push("/");
			} else {
				console.error("Login error: inside", error.message);
			}
		} catch (error) {
			console.error("Login error:", error.message);
		}

		setShowInvalidCredentials(true);
		// Hide the message after 5 seconds
		setTimeout(() => {
			setShowInvalidCredentials(false);
		}, 5000);

		alert("Email: " + email + " Password: " + password);
	};

	const handleCreateAccount = async (e) => {
		e.preventDefault();
		router.push("/registration");
	};

	return (
		<div
			className="min-h-screen w-full"
			style={{
				backgroundImage: `url(${loginBg.src})`,
				width: "100%",
				height: "100%",
				backgroundSize: "cover",
				backgroundAttachment: "fixed",
				backgroundPosition: "center",
			}}
		>
			{/* navigation bar */}
			<div className="h-20 w-full bg-white flex flex-row justify-between items-center px-44">
				<div className="text-2xl text-[#6B9080] font-Merriweather font-bold">
					WellTalk
				</div>
				<div className="flex flex-row gap-x-16">
					<div className="text-lg font-Jaldi">Home</div>
					<div className="text-lg font-Jaldi">About</div>
					<div className="text-lg font-Jaldi">Contact</div>
				</div>
			</div>

			{/* login form*/}
			<div className="flex justify-start items-center py-5 px-48 ">
				<div className="w-7/12 h-[650px] flex flex-col justify-center">
					{/* login form*/}
					<div className="flex justify-start items-center py-5 px-48 ">
						<form
							className="w-full h-[700px] flex flex-col justify-center"
							onSubmit={handleLogin}
						>
							<p className="text-black text-5xl font-Merriweather py-20 pb-3.5">
								Sign in
							</p>

							{/* error message */}
							{showInvalidCredentials && (
								<div className="text-red-500 font-bold text-base pt-2 pb-1.5">
									Invalid email or password. Try Again.
								</div>
							)}

							{/* form inputs */}
							<div className="flex flex-col gap-y-3 pb-14">
								<TextInput
									label="Email Address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									type="email"
								/>
								<TextInput
									label="Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									type="password"
								/>
							</div>

							{/*to be made into component */}
							<div className="w-full flex flex-row gap-x-8 pb-12">
								<HollowButton
									className="w-1/2"
									onClick={handleLogin}
								>
									Sign In
								</HollowButton>
								<FullButton
									className="w-1/2"
									onClick={handleCreateAccount}
								>
									Create Account
								</FullButton>
							</div>

							{/* forgot password */}
							<div
								className="text-[#6B9080] text-lg font-Jaldi pt-4 hover:text-green-800 cursor-pointer"
								onClick={(e) =>
									setShowForgotPasswordModal(true)
								}
							>
								Forgot Password?
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* forgot password modal */}
			{showForgotPasswordModal && (
				<ModalForgotPassword
					setShowForgotPasswordModal={setShowForgotPasswordModal}
					forgotPasswordEmail={forgotPasswordEmail}
					setForgotPasswordEmail={setForgotPasswordEmail}
				/>
			)}
		</div>
	);
};

export default Login;
