"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer) || {
    assignments: [],
  };

  const isNew = aid === "new";
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState({
    _id: aid,
    title: "",
    description: "",
    points: 100,
    due: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  useEffect(() => {
    if (!isNew && existingAssignment) {
      setAssignment(existingAssignment);
    } else if (!isNew && !existingAssignment) {
      const dbAssignment = (db.assignments as any[]).find(
        (a) => a._id === aid && a.course === cid
      );
      if (dbAssignment) setAssignment(dbAssignment);
    }
  }, [aid, existingAssignment, isNew, cid]);

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const defaultDescription = `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories`;

  return (
    <div id="wd-assignment-editor" className="container mt-4">
      <h2 className="mb-4">
        {isNew ? "New Assignment" : "Edit Assignment"} – {cid}
      </h2>

      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="assignment-title">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control
                type="text"
                value={assignment.title}
                placeholder="Assignment Name"
                onChange={(e) =>
                  setAssignment({ ...assignment, title: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="assignment-description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={assignment.description || defaultDescription}
                onChange={(e) =>
                  setAssignment({ ...assignment, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="text-md-end">
            <Form.Label>Points</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value) || 0,
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="text-md-end">
            <Form.Label>Display Grade As</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select defaultValue="Percentage">
              <option>Percentage</option>
              <option>Points</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="text-md-end">
            <Form.Label>Submission Type</Form.Label>
          </Col>
          <Col md={9}>
            <Card className="p-3">
              <Form.Select className="mb-3" defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>External Tool</option>
              </Form.Select>

              <div>
                <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                <Form.Check label="Text Entry" defaultChecked />
                <Form.Check label="Website URL" defaultChecked />
                <Form.Check label="Media Recordings" />
                <Form.Check label="Student Annotation" />
                <Form.Check label="File Uploads" />
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
                <Form.Label>Assign To</Form.Label>
                <div className="wd-assign-to-container">
                  <span className="wd-assign-tag">
                    Everyone <button className="wd-remove-tag">×</button>
                  </span>
                </div>
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Due</Form.Label>
                    <Form.Control
                      type="date"
                      value={assignment.due}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          due: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Available From</Form.Label>
                    <Form.Control
                      type="date"
                      value={assignment.availableFrom}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          availableFrom: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="date"
                      value={assignment.availableUntil}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          availableUntil: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <hr />

        <div className="d-flex justify-content-end gap-2 mb-4">
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
