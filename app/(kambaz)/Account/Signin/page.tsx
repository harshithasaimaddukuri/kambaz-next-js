"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer"; 
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "alice123", 
    password: "secretpw", 
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = db.users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (!user) {
      alert("Invalid credentials"); 
      return; 
    }

    dispatch(setCurrentUser(user));

    router.push("/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Sign in</h3>

      <FormControl
        id="wd-username"
        placeholder="username"
        value={credentials.username}
        className="mb-2"
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <br />

      <FormControl
        id="wd-password"
        type="password"
        placeholder="password"
        value={credentials.password}
        className="mb-2"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <br />

      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
        Sign in
      </Button>

      <div className="text-center">
        <Link id="wd-signup-link" href="/Kambaz/Account/Signup" className="text-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
}
