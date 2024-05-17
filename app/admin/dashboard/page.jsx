import SideNav from "@/components/admin_components/SideNav";
import Box from "@mui/material/Box";
import { DrawerHeader } from "@/components/admin_components/SideNav";

const AdminDashboard = () => {
  return (
    <div className="w-full min-h-screen flex bg-black">
      <SideNav />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "white" }}
      >
        <DrawerHeader />
        <h1 className="text-black">Admin Dashboard</h1>
      </Box>
    </div>
  );
};

export default AdminDashboard;
