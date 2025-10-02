export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <form action="/Courses/1234/Home" method="get">
        <button
          type="submit"
          id="wd-course-home-link"
          className="list-group-item list-group-item-action border-0 border-start border-dark w-100"
        >
          Home
        </button>
      </form>
      <form action="/Courses/1234/Modules" method="get">
        <button
          type="submit"
          id="wd-course-modules-link"
          className="list-group-item list-group-item-action text-danger border-0 w-100"
        >
          Modules
        </button>
      </form>
      <form action="/Courses/1234/Piazza" method="get">
        <button
          type="submit"
          id="wd-course-piazza-link"
          className="list-group-item list-group-item-action text-danger border-0 w-100"
        >
          Piazza
        </button>
      </form>
      <form action="/Courses/1234/Zoom" method="get">
        <button
          type="submit"
          id="wd-course-zoom-link"
          className="list-group-item list-group-item-action text-danger border-0 w-100"
        >
          Zoom
        </button>
      </form>
      <form action="/Courses/1234/Assignments" method="get">
        <button
          type="submit"
          id="wd-course-assignments-link"
          className="list-group-item list-group-item-action text-danger border-0 w-100"
        >
          Assignments
        </button>
      </form>
      <form action="/Courses/1234/Quizzes" method="get">
        <button
          type="submit"
          id="wd-course-quizzes-link"
          className="list-group-item list-group-item-action text-danger border-0 w-100"
        >
          Quizzes
        </button>
      </form>
      <form action="/Courses/1234/People/Table" method="get">
        <button
          type="submit"
          id="wd-course-people-link"
          className="list-group-item list-group-item-action text-danger border-0 w-100"
        >
          People
        </button>
      </form>
      <form action="/Courses/1234/Grades" method="get">
        <button
          type="submit"
          id="wd-course-grades-link"
          className="list-group-item list-group-item-action text-danger border-0 w-100"
        >
          Grades
        </button>
      </form>
    </div>
  );
}