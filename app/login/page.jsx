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
      console.log("email: ", email);
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
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="p-5 bg-red-600">
        Login
      </button>
    </form>
  );
};

export default Login;
