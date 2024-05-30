"use client";
import { useEffect, useState } from "react";
import ReferralsTable from "../ReferralsTable";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { getUserSession } from "@/lib/helperFunctions";

const Referrals = () => {
  const [referrals, setReferrals] = useState();
  const userSession = getUserSession();

  useEffect(() => {
    if (userSession) {
      try {
        fetchReferrals();
      } catch (error) {
        console.error("Error fetching referrals", error);
      }
    }
  }, []);

  const fetchReferrals = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_REFERRALS}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching appointments");
    }
    const data = await response.json();
    setReferrals(data);
  };

  const handleDeleteReferral = (referralId) => {
    setReferrals(
      referrals.filter((referral) => referral.referralId !== referralId)
    );
  };

  return (
    <div className="w-full bg-white font-Merriweather">
      <div>
        <h1 className="font-bold text-3xl mb-10">Referrals</h1>
        <ReferralsTable referrals={referrals} onDelete={handleDeleteReferral} />
      </div>
    </div>
  );
};

export default Referrals;
