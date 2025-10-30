//disable eslint for this file

"use client";

import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Image from "next/image";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
}

interface RootState {
  coursesReducer: {
    courses: Course[];
  };
}

export default function Dashboard() {
  const dispatch = useDispatch();

  const courses: Course[] = useSelector((state: RootState) => state.coursesReducer.courses);

  const [course, setCourse] = useState<Course>({
    _id: uuidv4(),
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <h1>Dashboard</h1>
      <hr />

      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          onClick={() => dispatch(addNewCourse({ ...course, _id: uuidv4() }))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
        >
          Update
        </button>
      </h5>

      <FormControl
        name="name"
        value={course.name}
        className="mb-2"
        onChange={handleInputChange}
        placeholder="Course Name"
      />
      <FormControl
        as="textarea"
        name="description"
        value={course.description}
        onChange={handleInputChange}
        placeholder="Course Description"
        className="mb-2"
      />

      <hr />
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((c: Course) => ( 
          <div key={c._id} className="col">
            <div className="card">
              <Image
                src={c.image}
                alt={c.name}
                width={300}
                height={200}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{c.name}</h5>
                <p className="card-text">{c.description}</p>
                <Link href={`/Kambaz/Courses/${c._id}`}>
                  <button className="btn btn-primary">Go</button>
                </Link>
                <button
                  className="btn btn-warning ms-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setCourse(c);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger float-end"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteCourse(c._id));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}