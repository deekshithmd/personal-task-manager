"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TaskState {
  tasks: any[];
}

// Define the initial state using that type
const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",

  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<any>) => {
      state.tasks = action?.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;
