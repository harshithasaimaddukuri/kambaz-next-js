"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          onClick={() => dispatch(addNewCourse(course))}
          id="wd-add-new-course-click"
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
        placeholder="Course Name"
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
        placeholder="Course Description"
      />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <Row xs={1} md={5} className="g-4 mt-2">
        {courses.map((c: any) => (
          <Col key={c._id}>
            <Card className="h-100">
              <Link href={`/Courses/${c._id}/Home`} className="text-decoration-none text-dark">
                <CardImg
                  src={c.image}
                  variant="top"
                  width="100%"
                  height={160}
                  alt={c.name}
                />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    {c.description}
                  </CardText>
                  <Button variant="primary" className="w-100">
                    Go
                  </Button>
                </CardBody>
              </Link>
              <div className="p-2 d-flex justify-content-between">
                <button
                  className="btn btn-warning me-2 flex-grow-1"
                  id="wd-edit-course-click"
                  onClick={(e) => {
                    e.preventDefault();
                    setCourse(c); 
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger flex-grow-1"
                  id="wd-delete-course-click"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteCourse(c._id));
                  }}
                >
                  Delete
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}