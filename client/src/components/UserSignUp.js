import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
      confirmPassword,
    } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  className="form-control"
                  onChange={this.change}
                />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  className="form-control"
                  onChange={this.change}
                />
                <input
                  type="text"
                  name="emailAddress"
                  id="emailAddress"
                  value={emailAddress}
                  placeholder="Email Address"
                  className="form-control"
                  onChange={this.change}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                  className="form-control"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password"
                  className="form-control"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
  change = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  submit = () => {
    const { context } = this.props;
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

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors) {
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
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default UserSignUp;
