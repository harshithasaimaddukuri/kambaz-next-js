"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import CoursesNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { courses } = useSelector((state: any) => state.coursesReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = courses.find((course: any) => course._id === cid);
  const [isNavVisible, setIsNavVisible] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          style={{ cursor: "pointer" }}
          onClick={() => setIsNavVisible(!isNavVisible)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsNavVisible(!isNavVisible);
            }
          }}
        />
        {course?.name} &gt; <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {isNavVisible && (
          <div className="d-none d-md-block">
            <CoursesNavigation />
          </div>
        )}
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}