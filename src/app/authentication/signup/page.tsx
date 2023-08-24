"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import signUp from "@/firebase/auth/signup";
import { SignupDataType } from "@/types/types";

const SignupPage = () => {
  const [newUserData, setNewUserData] = useState<SignupDataType>({
    email: "",
    password: "",
    confirm: "",
  });
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (
      newUserData?.email !== "" &&
      newUserData?.password === newUserData?.confirm
    ) {
      const newUser = {
        email: newUserData?.email,
        password: newUserData?.password,
      };

      const { signupData } = await signUp(newUser);

      router?.push("/authentication/login");
    } else {
      router?.push("/authentication/signup");
    }
    setNewUserData({
      email: "",
      password: "",
      confirm: "",
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="w-full flex items-center justify-center">
          <h1 className="text-2xl font-semibold mb-4">SignUp</h1>
        </div>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type your username..."
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-violet-400"
              value={newUserData?.email}
              onChange={(e) =>
                setNewUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-violet-400"
              placeholder="Type your password..."
              value={newUserData?.password}
              onChange={(e) =>
                setNewUserData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-violet-400"
              placeholder="Confirm your password..."
              value={newUserData?.confirm}
              onChange={(e) =>
                setNewUserData((prev) => ({
                  ...prev,
                  confirm: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-violet-700 text-white py-2 rounded hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Signup
            </button>
          </div>
        </form>
        <p className="text-gray-600 mt-4">
          Have account already?
          <a
            href="/authentication/login"
            className="text-violet-700 hover:underline"
          >
            Click here to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
