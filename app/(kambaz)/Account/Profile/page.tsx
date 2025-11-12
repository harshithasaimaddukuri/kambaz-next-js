/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = async () => {
    try {
      const user = await client.profile();
      dispatch(setCurrentUser(user));
      setProfile(user);
    } catch (err) {
      router.push("/Account/Signin");
    }
  };

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  useEffect(() => {
    if (!currentUser) {
      fetchProfile();
    } else {
      setProfile(currentUser);
    }
  }, []);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile._id && (
        <div>
          <FormControl 
            id="wd-username" 
            className="mb-2"
            value={profile.username || ''}
            placeholder="Username"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <FormControl 
            id="wd-password" 
            className="mb-2"
            type="password"
            value={profile.password || ''}
            placeholder="Password"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <FormControl 
            id="wd-firstname" 
            className="mb-2"
            value={profile.firstName || ''}
            placeholder="First Name"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <FormControl 
            id="wd-lastname" 
            className="mb-2"
            value={profile.lastName || ''}
            placeholder="Last Name"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <FormControl 
            id="wd-dob" 
            className="mb-2" 
            type="date"
            value={profile.dob || ''}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl 
            id="wd-email" 
            className="mb-2"
            value={profile.email || ''}
            placeholder="Email"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select 
            className="form-control mb-2" 
            id="wd-role"
            value={profile.role || 'STUDENT'}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button 
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            Update
          </Button>
          <Button 
            onClick={signout} 
            className="btn btn-danger w-100 mb-2" 
            id="wd-signout-btn"
          >
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}