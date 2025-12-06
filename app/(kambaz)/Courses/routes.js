import coursesdao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js"; 

export default function CourseRoutes(app, db) {
  db.courses = db.courses || [];

  app.get("/api/courses", (req, res) => {
    res.json(db.courses);
  });
  
  app.get("/api/courses/enrolled/:userId", (req, res) => {
    const userEnrollments = db.enrollments?.filter(e => e.user === req.params.userId) || [];
    const enrolledCourseIds = userEnrollments.map(e => e.course);
    const enrolledCourses = db.courses?.filter(c => enrolledCourseIds.includes(c._id)) || [];
    res.json(enrolledCourses);
  });
  
  app.get("/api/courses/:courseId", (req, res) => {
    const course = db.courses?.find(c => c._id === req.params.courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  });
  
  app.post("/api/courses", (req, res) => {
    const newCourse = {
      ...req.body,
      _id: req.body._id || Date.now().toString()
    };
    db.courses.push(newCourse);
    res.json(newCourse);
  });
  
  app.put("/api/courses/:courseId", (req, res) => {
    const index = db.courses?.findIndex(c => c._id === req.params.courseId);
    if (index !== -1 && index !== undefined) {
      db.courses[index] = {
        ...db.courses[index],
        ...req.body,
        _id: req.params.courseId
      };
      res.json(db.courses[index]);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  });
  
  app.delete("/api/courses/:courseId", (req, res) => {
    const index = db.courses?.findIndex(c => c._id === req.params.courseId);
    if (index !== -1 && index !== undefined) {
      db.courses.splice(index, 1);
      db.enrollments = db.enrollments?.filter(e => e.course !== req.params.courseId) || [];
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  });
}