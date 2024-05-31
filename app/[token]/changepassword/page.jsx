"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

// imgs
import bgChangePass from "@/public/images/bgs/bgChangePass.jpg";
import ModalChangePassword from "@/components/ui/modals/ForgotPassword/ModalChangePassword";

const ChangePassword = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isTokenReady, setIsTokenReady] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (pathname && searchParams) {
      const tokenFromPath = pathname.split("/")[1]; // Get the token from the path
      setToken(tokenFromPath);
      setIsTokenReady(true);
    }
  }, [pathname, searchParams]);

  if (!isTokenReady) {
    return <p>Loading...</p>;
  }

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

      <ModalChangePassword token={token} />
    </div>
  );
};

export default ChangePassword;
