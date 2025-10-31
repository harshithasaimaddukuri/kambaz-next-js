//eslint-disable-whole-file
"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { 
  Row, 
  Col, 
  Card, 
  CardImg, 
  CardBody, 
  CardTitle, 
  CardText, 
  Button,
  Form 
} from "react-bootstrap";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
}

interface CoursesState {
  courses: Course[];
}

interface RootState {
  coursesReducer: CoursesState;
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      <h5>
        New Course
        <Button 
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => dispatch(addNewCourse(course) as any)}
        >
          Add
        </Button>
        <Button 
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => dispatch(updateCourse(course) as any)}
        >
          Update
        </Button>
      </h5>
      <br />
      
      <Form.Control 
        type="text"
        value={course.name}
        className="mb-2"
        placeholder="Course Name"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <Form.Control 
        as="textarea"
        value={course.description}
        rows={3}
        placeholder="Course Description"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      
      <hr />
      
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: Course) => (
            <Col 
              key={course._id} 
              className="wd-dashboard-course" 
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg 
                    src={course.image || "/images/reactjs.jpg"} 
                    variant="top" 
                    width="100%" 
                    height={160} 
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    
                    <Button variant="primary">
                      Go
                    </Button>
                    
                    <Button 
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </Button>
                    
                    <Button 
                      onClick={(event) => {
                        event.preventDefault();
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        dispatch(deleteCourse(course._id) as any);
                      }}
                      className="btn btn-danger float-end me-2"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}