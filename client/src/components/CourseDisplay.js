import React from "react";
import { Link } from "react-router-dom";

const CourseDisplay = ({ title, id }) => {
  return (
    <div className="bounds">
      <div className="grid-33">
        <Link to={`/courses/${id}`} className="course--module course--link">
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{title}</h3>
        </Link>
      </div>
    </div>
  );
};

export default CourseDisplay;
