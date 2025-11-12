/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      if (!user.username || !user.password) {
        setError("Username and password are required");
        return;
      }
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Username already taken");
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl 
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2" 
        placeholder="username" 
        id="wd-username"
      />
      <FormControl 
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2" 
        placeholder="password" 
        type="password"
        id="wd-password"
      />
      <Button 
        onClick={signup} 
        className="wd-signup-btn btn btn-primary mb-2 w-100"
        id="wd-signup-btn"
      > 
        Sign up 
      </Button>
      <br />
      <Link href="/Account/Signin" className="wd-signin-link" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}