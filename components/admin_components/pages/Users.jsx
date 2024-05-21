"use client";
import { useState } from "react";
import UserTable from "@/components/admin_components/UserTable";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      idNumber: "19-1911-377",
      role: "counselor",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      idNumber: "19-1911-300",
      role: "student",
    },
    {
      id: 3,
      name: "Alice Doe",
      email: "alice@example.com",
      idNumber: "19-2000-377",
      role: "teacher",
    },
    {
      id: 4,
      name: "Bob Doe",
      email: "bob@example.com",
      idNumber: "19-1911-2222",
      role: "teacher",
    },
    {
      id: 5,
      name: "Michael Smith",
      email: "michael@example.com",
      idNumber: "11-1911-477",
      role: "counselor",
    },
    {
      id: 6,
      name: "Emily Johnson",
      email: "emily@example.com",
      idNumber: "19-1211-307",
      role: "student",
    },
    {
      id: 7,
      name: "William Brown",
      email: "william@example.com",
      idNumber: "20-1911-277",
      role: "student",
    },
    {
      id: 8,
      name: "Emma Jones",
      email: "emma@example.com",
      idNumber: "19-1911-0000",
      role: "teacher",
    },
    {
      id: 9,
      name: "Olivia Taylor",
      email: "olivia@example.com",
      idNumber: "19-1911-100",
      role: "student",
    },
    {
      id: 10,
      name: "James Wilson",
      email: "james@example.com",
      idNumber: "19-1911-113",
      role: "teacher",
    },
    {
      id: 11,
      name: "Sophia Anderson",
      email: "sophia@example.com",
      idNumber: "19-1911-377",
      role: "student",
    },
    {
      id: 12,
      name: "Daniel Martinez",
      email: "daniel@example.com",
      idNumber: "19-1911-377",
      role: "counselor",
    },
    {
      id: 13,
      name: "Isabella Jackson",
      email: "isabella@example.com",
      idNumber: "19-1911-377",
      role: "student",
    },
    {
      id: 14,
      name: "Liam Harris",
      email: "liam@example.com",
      idNumber: "19-1911-377",
      role: "teacher",
    },
    {
      id: 15,
      name: "Mia Martin",
      email: "mia@example.com",
      idNumber: "19-1911-377",
      role: "teacher",
    },
    {
      id: 16,
      name: "Ethan Thompson",
      email: "ethan@example.com",
      idNumber: "19-1911-377",
      role: "student",
    },
    {
      id: 17,
      name: "Amelia Garcia",
      email: "amelia@example.com",
      idNumber: "19-1911-377",
      role: "counselor",
    },
    {
      id: 18,
      name: "Lucas Robinson",
      email: "lucas@example.com",
      idNumber: "19-1911-377",
      role: "student",
    },
    {
      id: 19,
      name: "Ava Clark",
      email: "ava@example.com",
      idNumber: "19-1911-377",
      role: "teacher",
    },
    {
      id: 20,
      name: "Alexander Rodriguez",
      email: "alexander@example.com",
      idNumber: "19-1911-377",
      role: "counselor",
    },
  ]);

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
