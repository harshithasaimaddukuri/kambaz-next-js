/*eslint-disable*/
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

const axiosWithCredentials = axios.create({ 
  withCredentials: true 
});

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(ENROLLMENTS_API, {
    user: userId,
    course: courseId,
  });
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/${userId}/${courseId}`
  );
  return response.data;
};

export const getUserEnrollments = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${ENROLLMENTS_API}/${userId}`
  );
  return response.data;
};
