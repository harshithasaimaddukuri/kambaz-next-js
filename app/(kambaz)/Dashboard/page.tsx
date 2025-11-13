/* eslint-disable @typescript-eslint/no-explicit-any */
 
 /* eslint-disable @typescript-eslint/ban-ts-comment */
 
// @ts-nocheck

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import * as enrollmentClient from "../Enrollments/client";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
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

interface User {
  _id: string;
  role: string;
}

interface RootState {
  accountReducer: { currentUser: User | null };
  coursesReducer: { courses: Course[] };
}

export default function Dashboard() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const isFaculty = currentUser?.role === "FACULTY";

  // Fetch enrolled courses (my courses) on component mount
  const fetchCourses = async () => {
    try {
      if (currentUser) {
        const myCourses = await client.findMyCourses();
        dispatch(setCourses(myCourses));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch all courses when needed
  const fetchAllCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  useEffect(() => {
    if (showAllCourses) {
      fetchAllCourses();
    }
  }, [showAllCourses]);

  // Server integrated CRUD operations
  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      // Reset form
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(setCourses(courses.map((c: any) => 
        c._id === course._id ? course : c
      )));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // For now, enrollment status is based on whether course is in "my courses"
  const isEnrolled = (courseId: string) => {
    return courses.some(c => c._id === courseId);
  };

  // Enrollment functions
  const handleEnroll = async (courseId: string) => {
    try {
      if (!currentUser) {
        console.error("No user logged in");
        return;
      }
      await enrollmentClient.enrollInCourse(currentUser._id, courseId);
      await fetchCourses(); // Refresh the enrolled courses
      await fetchAllCourses(); // Refresh all courses if showing
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      if (!currentUser) {
        console.error("No user logged in");
        return;
      }
      await enrollmentClient.unenrollFromCourse(currentUser._id, courseId);
      await fetchCourses(); // Refresh the enrolled courses
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  const visibleCourses = showAllCourses ? allCourses : courses;

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"  
              onClick={onAddNewCourse}
            >
              Add
            </Button>
            <Button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </Button>
          </h5>
          <br />

          <Form.Control
            type="text"
            value={course.name === "New Course" ? "" : course.name}
            className="mb-2"
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <Form.Control
            as="textarea"
            value={
              course.description === "New Description" ? "" : course.description
            }
            rows={3}
            placeholder="Course Description"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Courses" : "My Courses"} (
          {visibleCourses.length})
        </h2>
        <Button
          variant="primary"
          id="wd-enrollments-button"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Courses" : "All Courses"}
        </Button>
      </div>

      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course) => {
            const enrolled = isEnrolled(course._id);
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  {enrolled ? (
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
                      <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}
                        </CardTitle>
                        <CardText
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {course.description}
                        </CardText>
                        <Button variant="primary">Go</Button>
                      </CardBody>
                    </Link>
                  ) : (
                    <>
                      <CardImg
                        src={course.image || "/images/reactjs.jpg"}
                        variant="top"
                        width="100%"
                        height={160}
                      />
                      <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}
                        </CardTitle>
                        <CardText
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {course.description}
                        </CardText>
                      </CardBody>
                    </>
                  )}

                  <CardBody className="pt-0">
                    {enrolled ? (
                      <Button
                        variant="danger"
                        className="w-100 mb-2"
                        onClick={() => handleUnenroll(course._id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        className="w-100 mb-2"
                        onClick={() => handleEnroll(course._id)}
                      >
                        Enroll
                      </Button>
                    )}

                    {isFaculty && enrolled && (
                      <div className="d-flex gap-2">
                        <Button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning flex-fill"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(course._id);
                          }}
                          className="btn btn-danger flex-fill"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}