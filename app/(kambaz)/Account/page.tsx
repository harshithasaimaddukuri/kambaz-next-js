"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function AccountPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser) redirect("/Kambaz/Account/Profile");
  else redirect("/Kambaz/Account/Signin");

  return null; 
}
