"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Sign up</h3>

      <FormControl id="wd-username" placeholder="username" className="mb-2" /><br />
      <FormControl id="wd-password" type="password" placeholder="password" className="mb-2" /><br />
      <FormControl id="wd-password-verify" type="password" placeholder="verify password" className="mb-2" /><br />

      <Link href="/Account/Profile" className="btn btn-primary w-100 mb-2">
        Sign up
      </Link>

      <div className="text-center">
        <Link href="/Account/Signin" className="text-primary">
          Sign in
        </Link>
      </div>
    </div>
  );
}
