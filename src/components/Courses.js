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
    <div>
      <h1>Display Course</h1>
      {course.map((course) => (
        <h1 key={course.id}>{course.title}</h1>
      ))}
    </div>
  );
};

export default Courses;
