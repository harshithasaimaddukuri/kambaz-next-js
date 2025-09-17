import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-Signup-screen">
      <h3>Sign up</h3>

      <input
        className="wd-username"
        type="text"
        defaultValue="alice123"
      /><br/>

      <input
        className="wd-password"
        type="password"
        defaultValue="secretpw"
      /><br/>

      <input
        className="wd-password-verify"
        type="password"
        defaultValue="secretpw"
      /><br/>

      <Link href="Profile"> Sign up </Link><br />
      <Link href="Signin"> Sign in </Link>
    </div>
  );
}
