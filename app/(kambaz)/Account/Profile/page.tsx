"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { FormControl, FormSelect, Button } from "react-bootstrap";

export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(currentUser || {});

  useEffect(() => {
    if (!currentUser) redirect("/Account/Signin");
    else setProfile(currentUser);
  }, [currentUser]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  if (!currentUser) return null; 
  return (
    <div id="wd-profile-screen" className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">Profile</h3>

      <FormControl
        id="wd-username"
        className="mb-2"
        defaultValue={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />

      <FormControl
        id="wd-password"
        type="password"
        className="mb-2"
        defaultValue={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />

      <FormControl
        id="wd-firstname"
        className="mb-2"
        defaultValue={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />

      <FormControl
        id="wd-lastname"
        className="mb-2"
        defaultValue={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />

      <FormControl
        id="wd-dob"
        type="date"
        className="mb-2"
        defaultValue={profile.dob}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />

      <FormControl
        id="wd-email"
        type="email"
        className="mb-2"
        defaultValue={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      <FormSelect
        id="wd-role"
        className="mb-3"
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>

      <Button
        onClick={signout}
        className="btn btn-danger w-100"
        id="wd-signout-btn"
      >
        Sign out
      </Button>
    </div>
  );
}
