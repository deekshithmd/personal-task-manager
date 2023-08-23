"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginDataType } from "@/types/types";
import signIn from "@/firebase/auth/signin";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@/features/auth/authSlice";
import { RootState } from "@/lib/store";

const LoginPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [userDetails, setUserDetails] = useState<LoginDataType>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  // handling login
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { result } = await signIn({
        email: userDetails?.email,
        password: userDetails?.password,
      });

      if (result?.user?.uid) {
        dispatch(
          setUserData({
            isLoggedIn: true,
            user: result?.user,
          })
        );
        router.push("/");
      }
    } catch (e) {
      console.error("error occured");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type your username..."
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
              value={userDetails?.email}
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, email: e.target.value }))
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
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
              placeholder="Type your password..."
              value={userDetails?.password}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-gray-600 mt-4">
          Don`t have an account?{" "}
          <a
            href="/authentication/signup"
            className="text-blue-500 hover:underline"
          >
            Click here to Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
