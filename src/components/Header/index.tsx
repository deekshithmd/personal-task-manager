import React from "react";
import { useRouter } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@/features/auth/authSlice";
import { RootState } from "@/lib/store";

export default function Header() {
  const isLoggenIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(setUserData({ isLoggenIn: false, user: {} }));
    localStorage.removeItem("isLoggenIn");
    localStorage.removeItem("user");
    router.push("/authentication/login");
  };

  return (
    <nav className="bg-slate-700 p-4 fixed left-0 top-0 right-0 w-full align-center">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-semibold">
          Task Manager
        </a>
        <button
          className="bg-white text-violet-700 hover:bg-violet-200 text-sm font-semibold px-4 py-2 rounded-full"
          onClick={() =>
            isLoggenIn ? handleLogout() : router.push("/authentication/login")
          }
        >
          {isLoggenIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
