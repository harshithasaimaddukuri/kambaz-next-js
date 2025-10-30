"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation">
      <nav className="nav flex-column">
        {!currentUser && (
          <>
            <Link
              href="/Kambaz/Account/Signin"
              className={`nav-link text-black border-0 border-start border-dark border-4 ${
                pathname.endsWith("signin") ? "active" : ""
              }`}
            >
              Signin
            </Link>
            <Link
              href="/Kambaz/Account/Signup"
              className={`nav-link text-danger ${
                pathname.endsWith("signup") ? "active" : ""
              }`}
            >
              Signup
            </Link>
          </>
        )}

        {currentUser && (
          <Link
            href="/Kambaz/Account/Profile"
            className={`nav-link text-primary ${
              pathname.endsWith("profile") ? "active" : ""
            }`}
          >
            Profile
          </Link>
        )}
      </nav>
    </div>
  );
}
