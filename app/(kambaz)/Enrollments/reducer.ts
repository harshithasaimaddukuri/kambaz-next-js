import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUser: (state, { payload }: { payload: { userId: string; courseId: string } }) => {
      const newEnrollment: Enrollment = {
        _id: Date.now().toString(),
        user: payload.userId,
        course: payload.courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenrollUser: (state, { payload }: { payload: { userId: string; courseId: string } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
  },
});

export const { enrollUser, unenrollUser } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;