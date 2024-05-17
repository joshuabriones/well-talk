"use client";

import { useState } from "react";

import SideNav from "@/components/admin_components/SideNav";
import Box from "@mui/material/Box";
import { DrawerHeader } from "@/components/admin_components/SideNav";
import Dashboard from "@/components/admin_components/pages/Dashboard";
import Statistics from "@/components/admin_components/pages/Statistics";
import Users from "@/components/admin_components/pages/Users";
import Appointments from "@/components/admin_components/pages/Appointments";

const AdminDashboard = () => {
  const [page, setPage] = useState("Dashboard");
  return (
    <div className="w-full min-h-screen flex bg-black">
      <SideNav setPage={setPage} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "white" }}
      >
        <DrawerHeader />
        {page === "Dashboard" && <Dashboard />}
        {page === "Appointments" && <Appointments />}
        {page === "Users" && <Users />}
        {page === "Statistics" && <Statistics />}
      </Box>
    </div>
  );
};

export default AdminDashboard;
