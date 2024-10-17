"use client";

import NotFoundPage from "@/app/not-found";
import FullButton from "@/components/ui/buttons/FullButton";
import { API_ENDPOINT } from "@/lib/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationPopup from "@/components/ui/modals/Confirmation";
import { default as LoadingState } from "@/components/Load";
import styles from "../../../../css/landing.module.css";

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
        <LoadingState />
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
      <section className={`${styles.hero} parallax`}>
        <div
          className={`fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50 backdrop-blur ${styles.floating}`}
          role="dialog"
        >
          <div className="modal-box relative p-4 sm:p-6 lg:p-9 border-2 text-center max-w-xs sm:max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-lg transform transition-transform duration-300 scale-95">
            <div className="">
              <img
                src="/images/loggo.png"
                alt=""
                className="h-20  sm:h-28 mx-auto"
              />
            </div>

            <p className="text-sm sm:text-base text-gray-600">
              Please acknowledge that you have received this message of
              referral.
            </p>

            <div className="flex flex-col  justify-center gap-y-4 sm:gap-x-4 py-4 sm:py-6 px-6 sm:px-12">
              <FullButton onClick={confirmedAccept}>Acknowledged</FullButton>
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
      </section>
    );
  } else {
    return <NotFoundPage />;
  }
};

export default PendingReferral;
