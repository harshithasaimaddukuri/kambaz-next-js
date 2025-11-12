import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const getEnrollments = (req, res) => {
    const { userId, courseId } = req.query;
    
    if (userId) {
      const enrollments = dao.findEnrollmentsForUser(userId);
      res.json(enrollments);
    } else if (courseId) {
      const enrollments = dao.findEnrollmentsForCourse(courseId);
      res.json(enrollments);
    } else {
      res.json(db.enrollments);
    }
  };

  const enrollInCourse = (req, res) => {
    const { userId, courseId } = req.body;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(400).json({ message: "Already enrolled" });
    }
  };

  const unenrollFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  };

  // Routes
  app.get("/api/enrollments", getEnrollments);
  app.post("/api/enrollments", enrollInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollFromCourse);
}