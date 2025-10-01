"use client";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuFile } from "react-icons/lu"; 

export default function Assignments() {
  const assignments = [
    {
      id: 123,
      title: "A1",
      availability: "May 6 at 12:00am",
      due: "May 13 at 11:59pm",
      points: 100,
    },
    {
      id: 124,
      title: "A2",
      availability: "May 13 at 12:00am",
      due: "May 20 at 11:59pm",
      points: 100,
    },
    {
      id: 125,
      title: "A3",
      availability: "May 20 at 12:00am",
      due: "May 27 at 11:59pm",
      points: 100,
    },
  ];

  return (
    <div id="wd-assignments" className="p-4">

      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaSearch />
            </span>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-secondary me-2">
            <FaPlus className="me-1" />
            Group
          </button>
          <button className="btn btn-danger">
            <FaPlus className="me-1" />
            Assignment
          </button>
        </div>
      </div>

      <div className="border rounded p-3 bg-light">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2" />
            <IoMdArrowDropdown className="me-2" />
            <strong>ASSIGNMENTS</strong>
            <span className="badge rounded-pill bg-white border text-dark ms-3">40% of Total</span>
          </div>
          <div>
            <button className="btn btn-outline-secondary btn-sm me-1">
              <FaPlus />
            </button>
            <IoEllipsisVertical />
          </div>
        </div>

        <ul className="list-unstyled mb-0">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="border-start border-success border-4 bg-white rounded mb-2 p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-start flex-grow-1">
                  <BsGripVertical className="me-2 text-muted" />
                  <LuFile className="me-2 text-success fs-4" /> {/* Updated icon */}
                  <div className="flex-grow-1">
                    <Link
                      href={`/Courses/1234/Assignments/${assignment.id}`}
                      className="text-dark text-decoration-none fw-bold"
                    >
                      {assignment.title}
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple Modules</span>
                      {" | "}
                      <strong>Not available until</strong> {assignment.availability}
                      {" | "}
                      <strong>Due</strong> {assignment.due}
                      {" | "}
                      {assignment.points} pts
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center ms-3">
                  <FaCheckCircle className="text-success me-2 fs-5" />
                  <IoEllipsisVertical />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
