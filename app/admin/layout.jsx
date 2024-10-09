"use client";

import Sidebar from "./_admincomponents/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-full flex gap-7 p-8 bg-bgDark1 overflow-x-scroll">
      <Sidebar />
      {children}
    </div>
  );
};

export default AdminLayout;
