import React from "react";

const UserSignUp = () => {
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          <form>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                placeholder="First Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                placeholder="Last Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="emailAddress"
                id="emailAddress"
                required
                placeholder="Email Address"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                placeholder="Confirm Password"
                className="form-control"
              />
            </div>

            <div className="grid-100 pad-bottom">
              <button type="submit" className="button">
                Sign Up
              </button>
              <button className="button button-secondary">Cancel</button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account?</p>
      </div>
    </div>
  );
};

export default UserSignUp;
