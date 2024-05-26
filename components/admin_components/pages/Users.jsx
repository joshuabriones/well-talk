"use client";
import { useState, useEffect } from "react";
import UserTable from "@/components/admin_components/UserTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/viewallusers"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="w-full bg-white font-Merriweather">
      <div>
        <h1 className="font-bold text-3xl mb-10">Users</h1>
        <UserTable users={users} onDelete={handleDeleteUser} />
      </div>
    </div>
  );
};

export default Users;
