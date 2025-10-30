import Modules from "../Modules/page"; 
import CourseStatus from "./status";      

export default function Home() {
  return (
    <div id="wd-home" className="d-flex container mt-4">
      <div className="flex-fill me-3">
        <Modules />
      </div>

      <div className="d-none d-lg-block" style={{ width: 250 }}>
        <CourseStatus />
      </div>
    </div>
  );
}

