"use client";

export default function CoursesPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Courses</h1>

      <div id="course-buttons" style={{ marginBottom: "20px" }}>
        <button onClick="toggleModules('java')" style={{ marginRight: "10px" }}>Java</button>
        <button onClick="toggleModules('python')" style={{ marginRight: "10px" }}>Python</button>
        <button onClick="toggleModules('web')" style={{ marginRight: "10px" }}>Web Development</button>
        <button onClick="toggleModules('ml')" style={{ marginRight: "10px" }}>Machine Learning</button>
        <button onClick="toggleModules('db')" style={{ marginRight: "10px" }}>Databases</button>
      </div>

      <div id="modules" style={{ marginTop: "20px" }}>
        <p>Please select a course to see its modules.</p>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          const courseModules = {
            java: ["OOP", "Collections", "Streams"],
            python: ["Basics", "Data Science", "Flask"],
            web: ["HTML", "CSS", "JS"],
            ml: ["Regression", "Classification"],
            db: ["SQL", "NoSQL", "Transactions"]
          };

          let currentCourse = null;

          function toggleModules(courseId) {
            const modulesDiv = document.getElementById("modules");
            if (currentCourse === courseId) {
              modulesDiv.innerHTML = "<p>Please select a course to see its modules.</p>";
              currentCourse = null;
              return;
            }
            currentCourse = courseId;

            const modules = courseModules[courseId];
            let html = "<h2>Modules for " + courseId.charAt(0).toUpperCase() + courseId.slice(1) + "</h2><ul>";
            modules.forEach(m => {
              html += "<li>" + m + "</li>";
            });
            html += "</ul>";
            modulesDiv.innerHTML = html;
          }
        `,
        }}
      />
    </div>
  );
}
