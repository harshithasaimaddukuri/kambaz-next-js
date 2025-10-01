"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Sign in</h3>

      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue="alice123"
        className="mb-2"
      /><br />

      <FormControl
        id="wd-password"
        type="password"
        placeholder="password"
        defaultValue="secretpw"
        className="mb-2"
      /><br />

      <Link href="/Dashboard" id="wd-signin-btn" className="btn btn-primary w-100 mb-2">
        Sign in
      </Link>

      <div className="text-center">
        <Link id="wd-signup-link" href="/Account/Signup" className="text-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
}
