/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../Database";

const initialState = {
  assignments: db.assignments || [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      const newAssignment = {
        ...action.payload,
        _id: action.payload._id || `A${Date.now()}`,
      };
      console.log("Adding assignment:", newAssignment);
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, action) => {
      console.log("Deleting assignment ID:", action.payload);
      state.assignments = state.assignments.filter(
        (assignment: any) => assignment._id !== action.payload
      ) as any;
    },
    updateAssignment: (state, action) => {
      console.log("Updating assignment:", action.payload);
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === action.payload._id ? action.payload : assignment
      ) as any;
    },
  },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } = 
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;