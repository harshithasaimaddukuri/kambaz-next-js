"use client";
import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">Profile</h3>

      <FormControl id="wd-username" defaultValue="alice" placeholder="username" className="mb-2" /><br />
      <FormControl id="wd-password" type="password" defaultValue="123" placeholder="password" className="mb-2" /><br />
      <FormControl id="wd-firstname" defaultValue="Alice" placeholder="First Name" className="mb-2" /><br />
      <FormControl id="wd-lastname" defaultValue="Wonderland" placeholder="Last Name" className="mb-2" /><br />
      <FormControl id="wd-dob" type="date" defaultValue="2000-01-01" className="mb-2" /><br />
      <FormControl id="wd-email" type="email" defaultValue="alice@wonderland" className="mb-2" /><br />

      <FormSelect id="wd-role" defaultValue="FACULTY" className="mb-3">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>

      <Link href="/Account/Signin" className="btn btn-danger w-100">
        Sign out
      </Link>
    </div>
  );
}
