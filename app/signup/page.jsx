// app/signup/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/supabaseClient";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      console.log("Supabase:", supabase);
      console.log("Supabase Auth:", supabase.auth);
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Registration error:", error.message);
      } else {
        console.log("Registration successful:", user);
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>SignUp</h2>
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
        SignUp
      </button>
    </form>
  );
};

export default Signup;
