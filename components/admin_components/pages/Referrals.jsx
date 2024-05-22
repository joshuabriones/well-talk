"use client";
import { useState } from "react";
import ReferralsTable from "../ReferralsTable";

// Dummy data
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Emily",
  "Chris",
  "Sarah",
  "David",
  "Laura",
  "James",
  "Anna",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
];
const reasons = [
  "Academic Issues",
  "Behavioral Issues",
  "Personal Problems",
  "Family Issues",
  "Health Concerns",
];
const additionalNotes = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];
const statuses = ["Pending", "Reviewed", "Resolved", "Closed"];

const teachers = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Teacher ${i + 1}`,
}));

const referralsGenerated = Array.from({ length: 20 }, (_, i) => ({
  referralId: i + 1,
  teacher: getRandomElement(teachers),
  referFirstName: getRandomElement(firstNames),
  referLastName: getRandomElement(lastNames),
  referStudentId: `S${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(4, "0")}`,
  reason: getRandomElement(reasons),
  additionalNotes: getRandomElement(additionalNotes),
  status: getRandomElement(statuses),
  isDeleted: false,
}));

const Referrals = () => {
  const [referrals, setReferrals] = useState(referralsGenerated);

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
