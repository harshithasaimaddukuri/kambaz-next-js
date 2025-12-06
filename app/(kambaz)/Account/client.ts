/*eslint-disable*/
import axios from "axios";

// Use environment variable for production, fallback to localhost for development
export const HTTP_SERVER = process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:4000";
export const USERS_API = `${HTTP_SERVER}/api/users`;

const axiosWithCredentials = axios.create({ 
  baseURL: HTTP_SERVER,
  withCredentials: true 
});

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};