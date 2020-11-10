import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
        </div>
        <nav>
          <Link className="signup" to="/signup">
            {" "}
            SignUp
          </Link>
          <Link className="signin" to="/signin">
            SignIn
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
