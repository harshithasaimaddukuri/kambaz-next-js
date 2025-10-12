"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  
  const links = [
    { name: "Home", id: "wd-course-home-link" },
    { name: "Modules", id: "wd-course-modules-link" },
    { name: "Piazza", id: "wd-course-piazza-link" },
    { name: "Zoom", id: "wd-course-zoom-link" },
    { name: "Assignments", id: "wd-course-assignments-link" },
    { name: "Quizzes", id: "wd-course-quizzes-link" },
    { name: "People", id: "wd-course-people-link" },
    { name: "Grades", id: "wd-course-grades-link" },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname.includes(link.name);
        const path = link.name === "People" 
          ? `/Courses/${cid}/People/Table` 
          : `/Courses/${cid}/${link.name}`;
        
        return (
          <Link
            key={link.id}
            href={path}
            id={link.id}
            className={`list-group-item list-group-item-action border-0 w-100 ${
              isActive 
                ? "border-start border-dark" 
                : "text-danger"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}