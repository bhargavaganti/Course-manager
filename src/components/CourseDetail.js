import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseDetail = ({ match }) => {
  const [courseDetail, setCourseDetail] = useState({});

  useEffect(() => {
    getCourseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCourseDetails = () => {
    axios
      .get(`http://localhost:5000/api/courses/${match.params.id}`)
      .then((response) => {
        setCourseDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Course Detail Page</h1>
      <h2>{courseDetail.title}</h2>
      <h2>{courseDetail.estimatedTime}</h2>
    </div>
  );
};

export default CourseDetail;
