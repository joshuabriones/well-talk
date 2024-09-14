"use client";

import { API_ENDPOINT } from "@/lib/api";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

import NotFoundPage from "@/app/not-found";

const PendingReferral = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (pathname && searchParams) {
      const tokenFromPath = pathname.split("/")[2];
      console.log(tokenFromPath);
      handleTokenValidation(tokenFromPath);
    }
  }, [pathname, searchParams]);

  const handleTokenValidation = async (tokenFromPath) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.VALIDATE_REFERRAL_TOKEN}${tokenFromPath}`,
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
      setIsLoading(false);
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
      <div>
        <h1>Referral</h1>
      </div>
    );
  } else {
    return <NotFoundPage />;
  }
};

export default PendingReferral;
