"use client";

import { useState } from "react";

import SideNav from "@/components/admin_components/SideNav";
import Box from "@mui/material/Box";
import { DrawerHeader } from "@/components/admin_components/SideNav";
import Dashboard from "@/components/admin_components/pages/Dashboard";
import Referrals from "@/components/admin_components/pages/Referrals";
import Users from "@/components/admin_components/pages/Users";
import Appointments from "@/components/admin_components/pages/Appointments";
import Load from "@/components/Load";
import Cookies from "js-cookie";
import { getUserSession } from "@/lib/helperFunctions";

const AdminDashboard = () => {
  const userSession = getUserSession();
  const [page, setPage] = useState("Dashboard");

  // if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
  //   return <Load route="login" />;
  // }

  // if (userSession && userSession.role !== "admin")
  //   return <Load route={userSession.role} />;

  return (
    <div className="w-full min-h-screen flex bg-white">
      <SideNav setPage={setPage} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "white" }}
      >
        <DrawerHeader />
        {page === "Dashboard" && <Dashboard userSession={userSession} />}
        {page === "Appointments" && <Appointments />}
        {page === "Users" && <Users />}
        {page === "Referrals" && <Referrals />}
      </Box>
    </div>
  );
};

export default AdminDashboard;
