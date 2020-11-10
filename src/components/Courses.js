import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseDisplay from "./CourseDisplay";

const Courses = () => {
  const [courses, setCourse] = useState([]);

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
      {courses.map((course) => (
        <CourseDisplay title={course.title} key={course.id} />
      ))}
    </div>
  );
};

export default Courses;
