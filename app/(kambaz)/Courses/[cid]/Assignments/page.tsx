"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, Form, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { IoEllipsisVertical, IoChevronDown } from "react-icons/io5";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { useState } from "react";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeAssignments = useSelector((state: any) => 
    state.assignmentsReducer?.assignments
  );
  
  // Use store assignments if available, otherwise fall back to database
  const assignments = storeAssignments || db.assignments || [];
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const courseAssignments = assignments.filter((amt: any) => amt.course === cid);

  const formatAssignmentId = (id: string) => {
    const numericPart = id.replace(/[^0-9]/g, '');
    const number = parseInt(numericPart, 10);
    return `A${number}`;
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAssignmentDates = (assignment: any) => {
    const formatDate = (dateString: string | undefined, defaultDate: string) => {
      if (!dateString) return defaultDate;
      
      try {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        
        if (defaultDate.includes("12:00am")) {
          return `${month} ${day} at 12:00am`;
        }
        return `${month} ${day} at 11:59pm`;
      } catch (error) {
        return defaultDate;
      }
    };
    
    const available = formatDate(assignment.available || assignment.availableFromDate, "May 6 at 12:00am");
    const due = formatDate(assignment.due || assignment.dueDate, "May 13 at 11:59pm");
    
    return { available, due };
  };

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
    }
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const handleAddAssignment = () => {
    router.push(`/Courses/${cid}/Assignments/new`);
  };

  const handleEditAssignment = (assignmentId: string) => {
    router.push(`/Courses/${cid}/Assignments/${assignmentId}`);
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          className="me-2"
          style={{ maxWidth: "300px" }}
        />
        <div>
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            id="wd-add-assignment-group"
          >
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button 
            variant="danger" 
            size="lg" 
            id="wd-add-assignment"
            onClick={handleAddAssignment}
          >
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="wd-assignment-group p-0 mb-0 fs-5 border-gray">
          <div className="wd-assignment-header p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoChevronDown className="me-2" />
              <span className="fw-bold">ASSIGNMENTS</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="wd-assignment-percentage me-3 border border-dark rounded-pill px-3 py-1 bg-gray text-dark">
                40% of Total
              </span>
              <FaPlus className="fs-4 me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
            {courseAssignments.map((assignment: any) => {
              const dates = getAssignmentDates(assignment);
              return (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment-item p-3 ps-1 d-flex align-items-start"
                >
                  <BsGripVertical className="me-2 fs-3 mt-1" />
                  <FaFileAlt className="me-2 mt-1 text-success" />
                  <div className="flex-grow-1">
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="text-decoration-none"
                    >
                      <strong className="text-dark">
                        {formatAssignmentId(assignment._id)}
                      </strong>
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">{assignment.title}</span>
                      <span className="mx-1">|</span>
                      <span>
                        <strong>Not available until</strong> {dates.available}
                      </span>
                      <span className="mx-1">|</span>
                      <br />
                      <span>
                        <strong>Due</strong> {dates.due}
                      </span>
                      <span className="mx-1">|</span>
                      <span>{assignment.points} pts</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCheckCircle className="text-success me-2" />
                    <Button
                      variant="link"
                      className="text-primary p-0 me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditAssignment(assignment._id);
                      }}
                      title="Edit Assignment"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="link"
                      className="text-danger p-0 me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteClick(assignment._id);
                      }}
                      title="Delete Assignment"
                    >
                      <FaTrash />
                    </Button>
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}