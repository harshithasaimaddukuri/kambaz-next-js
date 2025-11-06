/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialAssignments = [
  {
    _id: "A101",
    title: "Propulsion Assignment",
    course: "RS101",
    points: 100,
    dueDate: "2024-05-13",
    availableFromDate: "2024-05-06",
    availableUntilDate: "2024-05-13",
    description: "Submit your propulsion system analysis",
    group: "Assignments",
    gradeAs: "Percentage",
    subType: "Online",
    AssignTo: "Everyone"
  },
  {
    _id: "A102",
    title: "Combustion Analysis",
    course: "RS101",
    points: 100,
    dueDate: "2024-05-20",
    availableFromDate: "2024-05-13",
    availableUntilDate: "2024-05-20",
    description: "Analyze combustion efficiency",
    group: "Assignments",
    gradeAs: "Points",
    subType: "Online",
    AssignTo: "Everyone"
  }
];

const initialState = {
  assignments: initialAssignments,
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
        _id: new Date().getTime().toString(),
        ...action.payload,
      };
      console.log("Adding assignment:", newAssignment);
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, action) => {
      console.log("Deleting assignment ID:", action.payload);
      state.assignments = state.assignments.filter(
        (assignment: any) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      console.log("Updating assignment:", action.payload);
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },
  },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } = 
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;