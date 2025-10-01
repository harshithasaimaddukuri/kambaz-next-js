import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <Link href="Signin" className="text-danger"> Signin </Link> <br />
      <Link href="Signup" className="text-danger"> Signup </Link> <br />
      <Link href="Profile" className="text-danger"> Profile </Link> <br />
    </div>
  );
}
