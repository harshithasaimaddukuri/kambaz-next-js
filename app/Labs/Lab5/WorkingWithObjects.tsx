"use client";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, 
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", 
    completed: false, 
    score: 0,
  });
  
  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    course: "CS5610"
  });
  
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  
  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      
      <h4>Retrieving Objects</h4>
      <a 
        id="wd-retrieve-assignments" 
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <a 
        id="wd-retrieve-module" 
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      <hr />
      
      <h4>Retrieving Properties</h4>
      <a 
        id="wd-retrieve-assignment-title" 
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <a 
        id="wd-retrieve-module-name" 
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
      <hr />
      
      <h4>Modifying Properties</h4>
      
      <div className="mb-3">
        <a 
          id="wd-update-assignment-title"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
        <Form.Control 
          className="w-75" 
          id="wd-assignment-title"
          defaultValue={assignment.title} 
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        />
      </div>
      
      <div className="mb-3">
        <a 
          id="wd-update-assignment-score"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
        <Form.Control 
          className="w-75" 
          id="wd-assignment-score"
          type="number"
          defaultValue={assignment.score} 
          onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })}
        />
      </div>
      
      <div className="mb-3">
        <a 
          id="wd-update-assignment-completed"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
        <Form.Check 
          className="w-75" 
          id="wd-assignment-completed"
          type="checkbox"
          label="Completed"
          checked={assignment.completed} 
          onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        />
      </div>
      
      <div className="mb-3">
        <a 
          id="wd-update-module-name"
          className="btn btn-info float-end"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name
        </a>
        <Form.Control 
          className="w-75" 
          id="wd-module-name"
          defaultValue={module.name} 
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
      </div>
      
      <div className="mb-3">
        <a 
          id="wd-update-module-description"
          className="btn btn-info float-end"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
        <Form.Control 
          className="w-75" 
          id="wd-module-description"
          as="textarea"
          rows={3}
          defaultValue={module.description} 
          onChange={(e) => setModule({ ...module, description: e.target.value })}
        />
      </div>
      <hr />
    </div>
  );
}