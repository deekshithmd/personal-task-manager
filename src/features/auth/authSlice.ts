"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  isLoggedIn?: boolean;
  user?: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = action?.payload?.isLoggedIn;
      state.user = action?.payload?.user;
      localStorage.setItem("isLoggedIn", String(state.isLoggedIn));
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
