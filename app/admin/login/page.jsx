"use client";
import { Divider, TextInput } from "@tremor/react";

const AdminLogin = () => {
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Log in to your account
          </h3>
          <form action="#" method="post" className="mt-6">
            <label
              htmlFor="adminUsername"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Username
            </label>
            <TextInput
              type="text"
              id="adminUsername"
              name="adminUsername"
              placeholder="admin123"
              className="mt-2"
            />
            <label
              htmlFor="adminPassword"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Password
            </label>
            <TextInput
              type="password"
              id="adminPassword"
              name="adminPassword"
              placeholder=""
              className="mt-2"
            />
            <button
              type="submit"
              className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-black py-2 text-center text-tremor-default font-medium text-white shadow-tremor-input hover:bg-slate-800"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
