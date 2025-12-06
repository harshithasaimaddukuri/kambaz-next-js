import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = (req, res) => {
    const { courseId } = req.params;
    const newAssignment = {
      ...req.body,
      course: courseId
    };
    const assignment = dao.createAssignment(newAssignment);
    res.json(assignment);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.updateAssignment(assignmentId, req.body);
    res.json(assignment);
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  };

  // Routes
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}