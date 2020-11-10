import React, { useState, useEffect } from "react";
import axios from "axios";

const Courses = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        console.log(response.data);
        setCourse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bounds">
      <div className="grid-33">
        {course.map((course) => (
          <div class="grid-33">
            <a class="course--module course--link" href="course-detail.html">
              <h4 class="course--label">Course</h4>
              <h3 class="course--title">{course.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
