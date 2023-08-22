"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  isLoggedIn?: boolean;
  accessToken?: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = action?.payload?.isLoggedIn;
      state.accessToken = action?.payload?.accessToken;
      localStorage.setItem("isLoggedIn", String(state.isLoggedIn));
      localStorage.setItem("accessToken", String(state.isLoggedIn));
    },
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
