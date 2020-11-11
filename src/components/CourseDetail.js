import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseDetail = ({ match }) => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    getCourseDetails();
    console.log(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCourseDetails = () => {
    axios
      .get(`http://localhost:5000/api/courses/${match.params.id}`)
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
      <div className="actions-bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
              <a className="button" href="update-course.html">
                Update Course
              </a>
              <a className="button" href="#">
                Delete Course
              </a>
            </span>
            <a className="button button-secondary" href="/">
              Return to List
            </a>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 class="course--title">{course.title}</h3>
                <p>By Paula Chuks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
