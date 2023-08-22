"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginDataType } from "@/types/types";
import signIn from "@/firebase/auth/signin";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@/features/auth/authSlice";
import { RootState } from "@/lib/store";

const LoginPage = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  console.log("token", token);
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
      dispatch(
        setUserData({
          isLoggedIn: true,
          accessToken: result?.user?.accessToken,
        })
      );
      router.push("/");
    } catch (e) {
      console.error("error occured");
    }
  };

  return (
    <div>
      <form className="flex" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          name="username"
          placeholder="Type your username..."
          value={userDetails?.email}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Type your password..."
          value={userDetails?.password}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button type="submit">Login</button>
        <p>
          Have account already?{" "}
          <a href="/authentication/signup">Click here to login</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
