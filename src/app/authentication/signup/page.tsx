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

      const {result} = await signUp(newUser);

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
    <div>
      <form className="flex" onSubmit={handleSignup}>
        <h1>Signup</h1>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          name="username"
          placeholder="Type your username..."
          value={newUserData?.email}
          onChange={(e) =>
            setNewUserData((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Type your password..."
          value={newUserData?.password}
          onChange={(e) =>
            setNewUserData((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          name="confirmd"
          placeholder="Confirm password..."
          value={newUserData?.confirm}
          onChange={(e) =>
            setNewUserData((prev) => ({ ...prev, confirm: e.target.value }))
          }
        />
        <button type="submit">Signup</button>
        {/* <p>
          Have account already? <a href="/auth/login">Click here to login</a>
        </p> */}
      </form>
    </div>
  );
};

export default SignupPage;
