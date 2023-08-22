"use-client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { setUserData } from "@/features/auth/authSlice";

// Testing whether user authenticated or not
const RequiresAuth = ({ children }: { children: any }) => {
  const isAuthorized = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggenIn")!);
    if (isAuthorized || isLoggedIn) {
      dispatch(setUserData(isLoggedIn));
    } else {
      router.push("/authentication/login");
    }
  }, [isAuthorized, router]);

  return children;
};

export default RequiresAuth;
