import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1235" className="wd-dashboard-course-link">
            <Image src="/images/nodejs.jpg" width={200} height={150} alt="Node.js" />
            <div>
              <h5> CS1235 Node.js </h5>
              <p className="wd-dashboard-course-title">
                Backend Development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1236" className="wd-dashboard-course-link">
            <Image src="/images/python.jpg" width={200} height={150} alt="Python" />
            <div>
              <h5> CS1236 Python </h5>
              <p className="wd-dashboard-course-title">
                Data Science Fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1237" className="wd-dashboard-course-link">
            <Image src="/images/java.jpg" width={200} height={150} alt="Java" />
            <div>
              <h5> CS1237 Java </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Programming
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1238" className="wd-dashboard-course-link">
            <Image src="/images/database.jpg" width={200} height={150} alt="Database" />
            <div>
              <h5> CS1238 Database Design </h5>
              <p className="wd-dashboard-course-title">
                Database Management Systems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1239" className="wd-dashboard-course-link">
            <Image src="/images/algorithms.jpg" width={200} height={150} alt="Algorithms" />
            <div>
              <h5> CS1239 Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Data Structures and Algorithms
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1240" className="wd-dashboard-course-link">
            <Image src="/images/machine-learning.jpg" width={200} height={150} alt="Machine Learning" />
            <div>
              <h5> CS1240 Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                AI and Machine Learning
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
