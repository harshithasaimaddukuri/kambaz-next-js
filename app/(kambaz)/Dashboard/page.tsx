"use client";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

const courses = [
  { id: 1234, title: "CS1234 React JS", desc: "Full Stack Software Developer", img: "/images/reactjs.jpg" },
  { id: 1235, title: "CS1235 Node.js", desc: "Backend Development", img: "/images/nodejs.jpg" },
  { id: 1236, title: "CS1236 Python", desc: "Data Science Fundamentals", img: "/images/python.jpg" },
  { id: 1237, title: "CS1237 Java", desc: "Object Oriented Programming", img: "/images/java.jpg" },
  { id: 1238, title: "CS1238 Database", desc: "Database Management Systems", img: "/images/database.jpg" },
  { id: 1239, title: "CS1239 HTML & CSS", desc: "Web Fundamentals", img: "/images/htmlcss.jpg" },
  { id: 1240, title: "CS1240 Cybersecurity", desc: "Fundamentals of Cybersecurity", img: "/images/cybersecurity.jpg" },
];

export default function Dashboard() {
  return (
    <div className="d-flex p-4" id="wd-dashboard-wrapper">
      <div className="flex-grow-1" id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <hr />
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
        <hr />

        <div id="wd-dashboard-courses">
          <Row xs={1} sm={2} md={4} className="g-4">
            {courses.map(course => (
              <Col key={course.id} className="wd-dashboard-course">
                <Card>
                  <Link
                    href={`/Courses/${course.id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg variant="top" src={course.img} height={160} alt={course.title} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.title}
                      </CardTitle>
                      <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.desc}
                      </CardText>
                      <Button variant="primary">Go</Button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
