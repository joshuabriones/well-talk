"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/supabaseClient";

//imgs
import loginBg from "@/public/images/loginBg.png";

// utils
import TextInput from "@/components/ui/TextInput";
import FullButton from "@/components/ui/FullButton";
import HollowButton from "@/components/ui/HollowButton";

const Login = () => {
	const router = useRouter();

	const [showFailedLogin, setShowFailedLogin] = useState(false);
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
				router.push("/");
			}
		} catch (error) {
			console.error("Login error:", error.message);
		}

		alert("Email: " + email + " Password: " + password);
	};

	const handleCreateAccount = async (e) => {
		e.preventDefault();
		alert("Create Account");
	};

	return (
		<div
			className="min-h-screen w-full"
			style={{
				backgroundImage: `url(${loginBg.src})`,
				width: "100%",
				height: "100%",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* navigation bar */}
			<div className="h-20 w-full bg-white flex flex-row justify-between items-center px-44">
				<div className="text-2xl text-[#6B9080] font-bold">
					WellTalk
				</div>
				<div className="flex flex-row gap-x-16">
					<div className="text-sm">Home</div>
					<div className="text-sm">About</div>
					<div className="text-sm">Contact</div>
				</div>
			</div>

			{/* login form*/}
			<div className="flex justify-start items-center py-5 px-48 ">
				<form
					className="w-5/12 h-[650px] flex flex-col justify-center"
					onSubmit={handleLogin}
				>
					<p className="text-black text-5xl">Sign in</p>

					<div className="flex flex-col gap-y-3 pt-5 pb-14">
						<TextInput
							label="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
						/>
						<TextInput
							label="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
						/>
					</div>

					{/*to be made into component */}
					<div className="w-full flex flex-row gap-x-8 pb-12">
						<HollowButton className="w-1/2" onClick={handleLogin}>
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
					<div className="text-[#6B9080] text-sm pt-4 hover:text-green-800">
						Forgot Password?
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
