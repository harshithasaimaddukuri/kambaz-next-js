"use client";
import { Form, Button, Row, Col, Card, FormGroup } from "react-bootstrap";
import * as db from "../../../../Database";
import { useParams } from "next/navigation";

interface Assignment {
  _id: string;
  title: string;
  points: number;
  due?: string;
  available?: string;
  course: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const amts: Assignment[] =
    cid === "RS101"
      ? [
          { _id: "A1", title: "Propulsion Assignment", course: "RS101", points: 100 },
          { _id: "A2", title: "Combustion Analysis", course: "RS101", points: 90 },
          { _id: "A3", title: "Nozzle Design Project", course: "RS101", points: 120 },
        ]
      : (db.assignments as Assignment[]);

  const defaultDescription = `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`;

  return (
    <>
      {amts
        .filter((amt) => amt.course === cid)
        .filter((amt) => amt._id === aid)
        .map((crsAmt) => (
          <div key={crsAmt._id} id="wd-assignments-editor" className="container mt-4">
            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                  <Form.Control type="text" id="wd-name" defaultValue={crsAmt.title} size="lg" />
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
                    defaultValue={defaultDescription}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3} className="text-md-end">
                <Form.Label htmlFor="wd-points">Points</Form.Label>
              </Col>
              <Col md={9}>
                <Form.Control type="number" id="wd-points" defaultValue={crsAmt.points} />
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
                          defaultValue={crsAmt.due ? `${crsAmt.due}T23:59` : ""}
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
                          defaultValue={crsAmt.available ? `${crsAmt.available}T00:00` : ""}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          id="wd-available-until"
                          defaultValue={crsAmt.due ? `${crsAmt.due}T23:59` : ""}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <hr />

            <div className="d-flex justify-content-end gap-2 mb-4">
              <Button variant="secondary">Save</Button>
              <Button variant="danger">Cancel</Button>
            </div>
          </div>
        ))}
    </>
  );
}
