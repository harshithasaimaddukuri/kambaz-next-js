import Link from "next/link";
import { Button, FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
        <h1>Signup</h1>
        <FormControl id="wd-username"
               placeholder="username"
               defaultValue={"aliceJunk"}
               className="mb-2"/><br />
        <FormControl id="wd-password"
               placeholder="password" 
               defaultValue={"password"}
                     type="password"      
               className="mb-2"/><br />
        <FormControl id="wd-password-verify"
               placeholder="verify password" type="password"
               defaultValue={"password"}
               className="mb-2"/><br />
               <Button variant="primary" id="wd-signup-btn" href="/Account/Profile"
               className="w-100 mb-2"> Sign up </Button><br />
        <Link id="wd-signin-link" href="/Account/Signin">Sign in</Link>
    </div>
);}