"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard, id: "wd-dashboard-link" },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid, id: "wd-courses-link" },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline, id: "wd-calendar-link" },
    { label: "Inbox", path: "/Inbox", icon: FaInbox, id: "wd-inbox-link" },
    { label: "Labs", path: "/Labs", icon: LiaBookSolid, id: "wd-labs-link" },
  ];

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
      <br />
      
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Account"
          id="wd-account-link"
          className="text-white text-decoration-none"
        >
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <br />

      {links.map((link) => {
        const Icon = link.icon;
        return (
          <div key={link.id}>
            <ListGroupItem className="border-0 bg-black text-center">
              <Link
                href={link.path}
                id={link.id}
                className="text-white text-decoration-none"
              >
                <Icon className="fs-1 text-danger" />
                <br />
                {link.label}
              </Link>
            </ListGroupItem>
            <br />
          </div>
        );
      })}
    </ListGroup>
  );
}
