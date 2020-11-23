import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  changeHandler = (e) => {
    e.persist();
    const value = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    };

    if (password !== confirmPassword) {
      this.setState({
        errors: ["password do not match"],
      });
    } else {
      axios
        .post("http://localhost:5000/api/courses", user)

        .then((errors) => {
          if (errors.length) {
            console.error(errors);
            this.setState({ errors });
          } else {
            console.log(
              `${firstName} ${lastName} is successfully signed up and authenticated with ${emailAddress}!`
            );
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.history.push("/error");
        });
    }
    //e.currentTarget.reset();
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  value={firstName}
                  placeholder="First Name"
                  className="form-control"
                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  value={lastName}
                  placeholder="Last Name"
                  className="form-control"
                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="emailAddress"
                  id="emailAddress"
                  required
                  value={emailAddress}
                  placeholder="Email Address"
                  className="form-control"
                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={this.changeHandler}
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
                  value={confirmPassword}
                  onChange={this.changeHandler}
                  placeholder="Confirm Password"
                  className="form-control"
                />
              </div>

              <div className="grid-100 pad-bottom">
                <button type="submit" className="button">
                  Sign Up
                </button>
                <button
                  className="button button-secondary"
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}

export default UserSignUp;
