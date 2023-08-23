"use-client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { setUserData } from "@/features/auth/authSlice";
import { setTasks } from "@/features/task/taskSlice";
import getTask from "@/firebase/firestore/getTasks";

// Testing whether user authenticated or not
const RequiresAuth = ({ children }: { children: any }) => {
  const isAuthorized = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const user = JSON.parse(localStorage.getItem("user")!);
      if (isAuthorized || isLoggedIn) {
        dispatch(setUserData({ isLoggedIn, user }));
        const { taskArray } = await getTask(user?.uid);
        dispatch(setTasks(taskArray));
      } else {
        router.push("/authentication/login");
      }
    })();
  }, [isAuthorized, router]);

  return children;
};

export default RequiresAuth;
