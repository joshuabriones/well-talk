"use client";

import NotFoundPage from "@/app/not-found";
import FullButton from "@/components/ui/buttons/FullButton";
import { API_ENDPOINT } from "@/lib/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationPopup from "@/components/ui/modals/Confirmation";

const PendingReferral = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const [confirmAction, setConfirmAction] = useState();
  const [accept, setAccept] = useState();

  useEffect(() => {
    if (pathname && searchParams) {
      const tokenFromPath = pathname.split("/")[2];
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
        setToken(tokenFromPath);
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

  const handleConfirm = async () => {
    setTitle("Accept Referral");
    setMessage("Are you sure you want to accept referral?");
    setAccept(true);
    setShowConfirm(true);
  };

  const handleDecline = async () => {
    setTitle("Decline Referral");
    setMessage("Are you sure you want to decline referral?");
    setAccept(false);
    setShowConfirm(true);
  };

  const confirmedAccept = async () => {
    console.log("token", token);
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.ACCEPT_REFERRAL}${token}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();
      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error("Error accepting referral", error);
    }
  };

  const confirmedDecline = async () => {
    console.log("aewhdbfe");
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.DECLINE_REFERRAL}${token}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();
      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error("Error declining referral", error);
    }
  };

  if (isTokenValid) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-[600px] h-[400px] rounded-xl py-2 px-10 flex flex-col justify-center items-center gap-y-2 shadow-xl">
          <div className="">
            <img src="/images/loggo.png" alt="" className="h-28" />
          </div>

          <div className="font-Merriweather text-center">
            Please confirm if you'd like to proceed with your referral to the
            guidance office. We appreciate your time and assistance.
          </div>

          <div className="w-10/12 flex flex-col items-center mt-4 gap-1.5">
            <FullButton onClick={handleConfirm}>
              I would like to proceed.
            </FullButton>
            <div
              className="text-xs cursor-pointer hover:scale-95 hover:text-[#8a252c]"
              onClick={handleDecline}
            >
              Decline
            </div>
          </div>
        </div>
        {showConfirm && (
          <ConfirmationPopup
            title={title}
            message={message}
            onCancel={() => setShowConfirm(false)}
            onConfirm={accept ? confirmedAccept : confirmedDecline}
          />
        )}
      </div>
    );
  } else {
    return <NotFoundPage />;
  }
};

export default PendingReferral;
