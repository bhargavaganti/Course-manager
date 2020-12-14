import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Sorry,you do not have access to perform this operation.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default Forbidden;
