import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js"; 

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"]; 
    if (!currentUser) {
        res.status(401).json({ message: "You must be signed in to create a course" });
        return;
    }

    const newCourse = dao.createCourse(req.body);
    // Enroll the creator (currentUser) in the new course
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id); 
    res.json(newCourse);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  };

  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const updatedCourse = dao.updateCourse(courseId, req.body); 
    if (updatedCourse) {
        res.json(updatedCourse); // Send the updated course back
    } else {
        res.sendStatus(404);
    }
  };
  
  const findCoursesForEnrolledUser = (req, res) => {
    /
    const courses = dao.findAllCourses(); 
    res.json(courses);
  };

  // RESTful Routes
  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
}