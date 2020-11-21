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

  const deleteCourse = (id) => {
    axios
      .delete("http://localhost:5000/api/courses/" + id)
      .then((response) => console.log(response.data));
    course.filter((course) => course.id !== id);
    //setCourse(course.filter((course) => course.id !== id));
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
              <button
                className="button"
                onClick={() => deleteCourse(course.id)}
              >
                Delete Course
              </button>
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
                <p>By Chuks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
