"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
  }
  if (session && session.user.role !== "admin") {
    router.push(`/${session.user.role}`);
  }

  if (session && session.user.role === "admin") {
    router.push("/admin/dashboard");
  }
  return <div>Admin Page</div>;
};

export default AdminPage;
