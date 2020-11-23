import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseDisplay from "./CourseDisplay";
import CreateCourseDisplay from "./CreateCourseDisplay";

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
    <div className="bounds">
      {courses.map((course) => (
        <CourseDisplay title={course.title} key={course.id} id={course.id} />
      ))}
      <CreateCourseDisplay />
    </div>
  );
};

export default Courses;
