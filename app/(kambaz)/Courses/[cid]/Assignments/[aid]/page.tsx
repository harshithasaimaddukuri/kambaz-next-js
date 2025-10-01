export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container-fluid p-4">

      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" defaultValue="A1" />
      </div>

      <div className="mb-3">
        <div className="border rounded p-3">
          <p>The assignment is <span className="text-danger">available online</span>.</p>
          <p>Submit a link to the landing page of your Web application running on Netlify.</p>
          <p>The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>The Kanbas application should include a link to navigate back to the landing page.</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-points" className="form-label">Points</label>
        </div>
        <div className="col-md-9">
          <input id="wd-points" className="form-control" type="number" defaultValue={100} />
        </div>
      </div>


      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
        </div>
        <div className="col-md-9">
          <select id="wd-group" className="form-select" defaultValue="ASSIGNMENTS">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECTS</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
        </div>
        <div className="col-md-9">
          <select id="wd-display-grade-as" className="form-select" defaultValue="Percentage">
            <option>Percentage</option>
            <option>Points</option>
            <option>Letter Grade</option>
            <option>Complete/Incomplete</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label className="form-label">Submission Type</label>
        </div>
        <div className="col-md-9">
          <div className="border rounded p-3">
            <select id="wd-submission-type" className="form-select mb-3" defaultValue="Online">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
            </select>

            <div className="mb-2"><strong>Online Entry Options</strong></div>

            <div className="form-check mb-2">
              <input type="checkbox" id="wd-text-entry" className="form-check-input" />
              <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
            </div>

            <div className="form-check mb-2">
              <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked />
              <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
            </div>

            <div className="form-check mb-2">
              <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
              <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
            </div>

            <div className="form-check mb-2">
              <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
              <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
            </div>

            <div className="form-check">
              <input type="checkbox" id="wd-file-upload" className="form-check-input" />
              <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label className="form-label">Assign</label>
        </div>
        <div className="col-md-9">
          <div className="border rounded p-3">
            <label htmlFor="wd-assign-to" className="form-label"><strong>Assign to</strong></label>
            <input id="wd-assign-to" className="form-control mb-3" defaultValue="Everyone" />

            <label htmlFor="wd-due-date" className="form-label"><strong>Due</strong></label>
            <input id="wd-due-date" type="date" className="form-control mb-3" defaultValue="2024-05-13" />

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-from" className="form-label"><strong>Available from</strong></label>
                <input id="wd-available-from" type="date" className="form-control" defaultValue="2024-05-06" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-until" className="form-label"><strong>Until</strong></label>
                <input id="wd-available-until" type="date" className="form-control" defaultValue="2024-05-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}