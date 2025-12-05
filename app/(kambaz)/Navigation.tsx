"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard, id: "wd-dashboard-link" },
    { label: "Courses", path: "/Courses", icon: LiaBookSolid, id: "wd-courses-link" },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline, id: "wd-calendar-link" },
    { label: "Inbox", path: "/Inbox", icon: FaInbox, id: "wd-inbox-link" },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid, id: "wd-labs-link" },
  ];

  const isAccountActive = pathname.startsWith("/Account");

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120, zIndex: 1000 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center p-0">
        <div className="py-2"></div>
      </ListGroupItem>

      <ListGroupItem className={`border-0 text-center ${isAccountActive ? "bg-white" : "bg-black"}`}>
        <Link href="/Account" id="wd-account-link" className="text-decoration-none">
          <FaRegCircleUser className={`fs-1 ${isAccountActive ? "text-danger" : "text-white"}`} />
          <div className="py-1"></div>
          <span className={isAccountActive ? "text-danger" : "text-white"}>Account</span>
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center p-0">
        <div className="py-2"></div>
      </ListGroupItem>

      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname.startsWith(link.path);

        return (
          <div key={link.id}>
            <ListGroupItem className={`border-0 text-center ${isActive ? "bg-white" : "bg-black"}`}>
              <Link href={link.path} id={link.id} className="text-decoration-none">
                <Icon className="fs-1 text-danger" />
                <div className="py-1"></div>
                <span className={isActive ? "text-dark" : "text-white"}>{link.label}</span>
              </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center p-0">
              <div className="py-2"></div>
            </ListGroupItem>
          </div>
        );
      })}
    </ListGroup>
  );
}
