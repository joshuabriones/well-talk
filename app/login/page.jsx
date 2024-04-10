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

  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <div className="text-2xl text-[#6B9080] font-bold">WellTalk</div>
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
          <p className="text-black text-5xl pb-3">Sign in</p>

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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          {/*to be made into component */}
          <div className="w-full flex flex-row gap-x-8 pb-12">
            <HollowButton className="w-1/2" onClick={handleLogin}>
              Sign In
            </HollowButton>
            <FullButton className="w-1/2" onClick={handleCreateAccount}>
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
