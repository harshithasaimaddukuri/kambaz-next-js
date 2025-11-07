"use client";
import { Form, Button, Row, Col, Card, FormGroup } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useState, useEffect } from "react";
import * as db from "../../../../Database";

interface Assignment {
  _id: string;
  title: string;
  points: number;
  due?: string;
  available?: string;
  course: string;
  description?: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeAssignments = useSelector((state: any) => 
    state.assignmentsReducer?.assignments
  );
  
  // Use store assignments if available, otherwise fall back to database
  const assignments: Assignment[] = storeAssignments || db.assignments || [];
  
  const isNewAssignment = aid === "new";
  const existingAssignment = !isNewAssignment 
    ? assignments.find((amt: Assignment) => amt._id === aid && amt.course === cid)
    : null;

  const defaultDescription = `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`;

  const [assignment, setAssignment] = useState({
    _id: "",
    title: "New Assignment",
    course: cid,
    points: 100,
    description: defaultDescription,
    due: "",
    available: "",
  });

  useEffect(() => {
    if (!isNewAssignment && existingAssignment) {
      setAssignment({
        _id: existingAssignment._id,
        title: existingAssignment.title,
        course: cid,
        points: existingAssignment.points,
        description: existingAssignment.description || defaultDescription,
        due: existingAssignment.due || "",
        available: existingAssignment.available || "",
      });
    } else if (isNewAssignment) {
      // Generate a new ID for new assignments
      const newId = `A${Date.now()}`;
      setAssignment(prev => ({
        ...prev,
        _id: newId,
        course: cid
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aid, cid, isNewAssignment, existingAssignment]);

  const handleSave = () => {
    console.log("Saving assignment:", assignment);
    console.log("Is new assignment:", isNewAssignment);
    
    if (isNewAssignment) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <Row className="mb-3">
        <Col>
          <FormGroup>
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control 
              type="text" 
              id="wd-name" 
              value={assignment.title}
              onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
              size="lg" 
            />
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Control
              as="textarea"
              id="wd-description"
              rows={8}
              value={assignment.description}
              onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-points">Points</Form.Label>
        </Col>
        <Col md={9}>
          <Form.Control 
            type="number" 
            id="wd-points" 
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
        </Col>
        <Col md={9}>
          <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">Assignment Group</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
        </Col>
        <Col md={9}>
          <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
            <option>Percentage</option>
            <option>Points</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
        </Col>
        <Col md={9}>
          <Card className="p-3">
            <Form.Select id="wd-submission-type" className="mb-3" defaultValue="Online">
              <option>Online</option>
              <option>On Paper</option>
              <option>External Tool</option>
            </Form.Select>

            <div>
              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" defaultChecked className="mb-2" />
              <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked className="mb-2" />
              <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-2" />
              <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-2" />
              <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label>Assign</Form.Label>
        </Col>
        <Col md={9}>
          <Card className="p-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
              <div className="wd-assign-to-container">
                <span className="wd-assign-tag">Everyone <button className="wd-remove-tag">×</button></span>
              </div>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-due-date"
                    value={assignment.due ? `${assignment.due}T23:59` : ""}
                    onChange={(e) => setAssignment({ ...assignment, due: e.target.value.split('T')[0] })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-available-from"
                    value={assignment.available ? `${assignment.available}T00:00` : ""}
                    onChange={(e) => setAssignment({ ...assignment, available: e.target.value.split('T')[0] })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-available-until"
                    value={assignment.due ? `${assignment.due}T23:59` : ""}
                    onChange={(e) => setAssignment({ ...assignment, due: e.target.value.split('T')[0] })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end gap-2 mb-4">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}