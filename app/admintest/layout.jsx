"use client";

import Sidebar from "./_admincomponents/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex gap-7 p-8 bg-bgDark1">
      <Sidebar />
      {children}
    </div>
  );
};

export default AdminLayout;
