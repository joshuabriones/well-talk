"use client";

import { API_ENDPOINT } from "@/lib/api";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

// imgs
import bgChangePass from "@/public/images/bgs/bgChangePass.jpg";
import ModalChangePassword from "@/components/ui/modals/ForgotPassword/ModalChangePassword";
import NotFoundPage from "@/app/not-found"; // Adjust the import path if necessary

const ChangePassword = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [token, setToken] = useState("");

  useEffect(() => {
    if (pathname && searchParams) {
      const tokenFromPath = pathname.split("/")[1]; // Get the token from the path
      setToken(tokenFromPath);
      handleTokenValidation(tokenFromPath); // Pass the token directly
    }
  }, [pathname, searchParams]);

  const handleTokenValidation = async (tokenFromPath) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.VERIFY_CHANGEPASSWORD_TOKEN}${tokenFromPath}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false after validation
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isTokenValid) {
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
          height: "100vh", 
          position: "relative",
          background: `radial-gradient(
              circle at 5% 85%,
              rgba(138, 37, 44, 0.7),
              transparent 40%
            ),
            radial-gradient(
              circle at 100% 10%,
              rgba(244, 197, 34, 0.5),
              transparent 40%
            ),
            #FFFFFF`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

        <ModalChangePassword token={token} />
      </div>
    );
  } else {
    return (
      <div>
        <NotFoundPage />
      </div>
    );
  }
};

export default ChangePassword;
