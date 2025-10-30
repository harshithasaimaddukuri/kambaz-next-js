"use client";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((c: any) => c._id === cid);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div id="wd-courses" className="p-4">
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          style={{ cursor: "pointer" }}
          onClick={() => setSidebarVisible(!sidebarVisible)} 
        />
        {course?.name || "Course Not Found"}
      </h2>
      <hr />
      <div className="d-flex">
        {sidebarVisible && (
          <div className="me-4" style={{ minWidth: "250px" }}>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}