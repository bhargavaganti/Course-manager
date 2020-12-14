import React from "react";
import { Link } from "react-router-dom";

const UnhandledError = () => {
  return (
    <div className="bounds">
      <h1>Internal Server Error</h1>
      <p>
        Sorry, An unexpected error just occurred, contact the administrator.
      </p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default UnhandledError;
