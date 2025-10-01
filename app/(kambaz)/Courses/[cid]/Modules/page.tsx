"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <span><BsGripVertical className="me-2 fs-3" /> Week 1</span>
            <ModuleControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> Introduction to the course</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> Learn what is Web Development</span>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>


        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <span><BsGripVertical className="me-2 fs-3" /> Week 2</span>
            <ModuleControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> Introduction to HTML</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> Learn how to create user interfaces with HTML</span>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>


        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <span><BsGripVertical className="me-2 fs-3" /> Week 3</span>
            <ModuleControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> Learn how to create tables</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <span><BsGripVertical className="me-2 fs-3" /> Learn how to create forms</span>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
