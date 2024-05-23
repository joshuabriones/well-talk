"use client";

import { useState } from "react";

import SideNav from "@/components/admin_components/SideNav";
import Box from "@mui/material/Box";
import { DrawerHeader } from "@/components/admin_components/SideNav";
import Dashboard from "@/components/admin_components/pages/Dashboard";
import Referrals from "@/components/admin_components/pages/Referrals";
import Users from "@/components/admin_components/pages/Users";
import Appointments from "@/components/admin_components/pages/Appointments";
import { Navbar } from "@/components/ui/Navbar";
const AdminDashboard = () => {
  const [page, setPage] = useState("Dashboard");
  return (
    <div className="w-full min-h-screen flex bg-white">
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "white" }}
      >
        <Navbar userType="counselor" />
        <DrawerHeader />
        {page === "Dashboard" && <Dashboard />}
        {page === "Appointments" && <Appointments />}
        {page === "Users" && <Users />}
        {page === "Referrals" && <Referrals />}
      </Box>
    </div>
  );
};

export default AdminDashboard;