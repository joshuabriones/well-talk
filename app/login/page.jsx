"use client";
import Load from "@/components/Load";
import { Navbar } from "@/components/ui/landing/LandingNav";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession, parseJwt } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// utils
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import TextInput from "@/components/ui/inputs/TextInput";

// modals
import ModalForgotPassword from "@/components/ui/modals/ForgotPassword/ModalForgotPassword";

const Login = () => {
	const userSession = getUserSession();
	const router = useRouter();

	const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// forgot password
	const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
	const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

	/* HANDLING UNAUTHENTICATED USERS */
	if (userSession && userSession.role) return <Load route={userSession.role} />;

	useEffect(() => {
		if (isLoading) {
			const token = Cookies.get("token");
			const user = parseJwt(token);

			const { id, sub, image, role } = user;
			const userData = { id: id, email: sub, image: image, role: role };
			Cookies.set("user", JSON.stringify(userData));

			if (user) {
				router.push(`/${user.role}`);
			}
		}
	}, [isLoading]);

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const result = await fetch(`${process.env.BASE_URL}${API_ENDPOINT.LOGIN}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					institutionalEmail: email,
					password,
				}),
			});

			if (result.ok) {
				const data = await result.json();

				Cookies.set("token", data.token);
				setIsLoading(true);
			} else {
				alert("Invalid email or password. Try again.");
				setShowInvalidCredentials(true);
				setTimeout(() => {
					setShowInvalidCredentials(false);
					setIsLoading(false);
				}, 5000);
			}
		} catch (error) {
			console.error("Login error:", error.message);
		}
	};

	// const handleLogin = async (e) => {
	//   e.preventDefault();

	//   try {
	//     const result = await signIn("credentials", {
	//       redirect: false,
	//       email,
	//       password,
	//     });

	//     if (result.ok) {
	//       console.log("Login successful:", result);
	//     } else {
	//       console.error("Login error: inside", error.message);
	//     }
	//   } catch (error) {
	//     console.error("Login error:", error.message);
	//   }

	//   setShowInvalidCredentials(true);
	//   // Hide the message after 5 seconds
	//   setTimeout(() => {
	//     setShowInvalidCredentials(false);
	//   }, 5000);
	// };

	const handleCreateAccount = async (e) => {
		e.preventDefault();
		router.push("/registration");
	};

	return (
		<section className="ezy__signup10 py-24 md:py-28 dark:bg-[#0b1727] text-zinc-900 dark:text-white flex justify-center items-center min-h-screen">
			<div
				className="pattern-overlay pattern-left absolute top-0 left-0 -z-10"
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

			<div className="container px-12 mx-auto">
				{/* navigation bar */}
				<Navbar userType="landing" />
				<div className="grid grid-cols-6 gap-6 h-full">
					<div className="col-span-6 md:col-span-2 lg:col-span-3">
						<div
							className="bg-cover bg-center ml-40 bg-no-repeat h-[80vh] rounded-xl hidden md:block w-[70%] md:w-[150%] lg:w-[130%]"
							style={{
								backgroundImage:
									"url(https://cdn.easyfrontend.com/pictures/sign-in-up/sign2.jpg)",
							}}
						></div>
					</div>
					<div className="col-span-6 md:col-span-4 lg:col-span-3 py-32">
						<div className="max-w-lg w-full h-full mx-auto px-0 md:px-8 lg:px-8">
							<div className="bg-white border border-gray-200 dark:bg-slate-800 shadow-xl rounded-2xl p-12 md:p-12 lg:py-10">
								<h2 className=" font-Merriweather dark:text-white text-2xl font-bold mb-3">
									Welcome to{" "}
									<span style={{ color: "#6B9080" }} className="px-1 rounded">
										WellTalk!
									</span>
								</h2>
								{/* login form */}
								<form className="w-full flex flex-col py-4" onSubmit={handleLogin}>
									{/* error message */}
									{showInvalidCredentials && (
										<div className="text-red-500 font-bold text-base pt-2 pb-1.5">
											Invalid email or password. Try Again.
										</div>
									)}

									{/* form inputs */}
									<div className="flex flex-col gap-y-3 pb-8">
										<TextInput
											label="Email Address"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											type="email"
											className="w-full"
										/>
										<TextInput
											label="Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type="password"
											className="w-full"
										/>
										<div className="flex justify-end">
										<div
											className="text-[#6B9080] text-md font-Jaldi  hover:text-green-800 cursor-pointer"
											onClick={(e) => setShowForgotPasswordModal(true)}
										>
											Forgot your Password?
										</div>
									</div>
									</div>

									{/* buttons */}
									<div className="w-full flex flex-row gap-x-4 pb-1">
										<FullButton className="w-1/2" onClick={handleLogin}>
											Sign In
										</FullButton>
									</div>

									{/* forgot password */}
									
									<div className="relative">
										<hr className="my-8 border-t border-gray-300" />
										<span className="px-2 text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800">
											Or
										</span>
									</div>
									<div className="w-full flex flex-row gap-x-4 pb-2">
										<HollowButton
											className="w-1/2"
											onClick={handleCreateAccount}
										>
											Create Account
										</HollowButton>
									</div>
								</form>
							</div>
						</div>
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
		</section>
	);
};

export default Login;
