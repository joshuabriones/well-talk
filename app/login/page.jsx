"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/supabaseClient";

const Login = () => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { user, error } = await supabase.auth.signIn({
				email,
				password,
			});

			if (error) {
				console.error("Login error:", error.message);
			} else {
				console.log("Login successful:", user);
				router.push("/"); // Redirect to home or landing page
			}
		} catch (error) {
			console.error("Login error:", error.message);
		}
	};

	return (
		<div className="min-h-screen w-full bg-[#EBEBEB]">
			{/* navigation bar */}
			<div className="h-20 w-full bg-white flex flex-row justify-between items-center px-44">
				<div className="text-2xl text-[#6B9080] font-bold">
					WellTalk
				</div>
				<div className="flex flex-row gap-x-24">
					<div className="text-sm">Home</div>
					<div className="text-sm">About</div>
					<div className="text-sm">Contact</div>
				</div>
			</div>

			{/* login form*/}
			<div className="bg-[#EBEBEB] flex justify-start items-center py-5 px-48 ">
				<form
					className="w-5/12 h-[650px] flex flex-col justify-center"
					onSubmit={handleLogin}
				>
					<p className="text-black text-5xl">Sign in</p>

					<div className="flex flex-col gap-y-3 pt-8 pb-14">
						{/* to be made into component */}
						<div>
							<div className="py-2.5">Email Address</div>
							<input
								className="h-14 w-full px-4 py-2 border border-gray-200 drop-shadow-md focus:outline-none focus:border-green-500  bg-white rounded-lg"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						{/* to be made into component */}
						<div>
							<div className="py-2.5">Password</div>
							<input
								className="h-14 w-full px-4 py-2 border border-gray-200 drop-shadow-md focus:outline-none focus:border-green-500  bg-white rounded-lg"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</div>

					{/*to be made into component */}
					<div className="w-full flex flex-row gap-x-8 pb-12">
						<button className="w-1/2  bg-white border-2 border-black text-black font-bold rounded-3xl px-4 py-3">
							Sign In
						</button>
						<button className="w-1/2 bg-black border-2 border-black text-white font-bold rounded-3xl px-4 py-3">
							Create Account
						</button>
					</div>

					{/* forgot password */}
					<div className="text-[#6B9080] pt-7">Forgot Password?</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
