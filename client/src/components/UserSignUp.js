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
      confirmPassword,
      errors,
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
                  onChange={this.change}
                />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={this.change}
                />
                <input
                  type="text"
                  name="emailAddress"
                  id="emailAddress"
                  value={emailAddress}
                  placeholder="Email Address"
                  onChange={this.change}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password"
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
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
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

    if (password !== confirmPassword) {
      this.setState({
        errors: ["password do not match"],
      });
    } else {
      context.data
        .createUser(user)
        .then((errors) => {
          if (errors) {
            this.setState({ errors });
          } else {
            context.actions.signIn(emailAddress, password).then(() => {
              this.props.history.push("/");
            });
          }
        })
        .catch((err) => {
          //handle rejected promises
          console.log(err);
          this.props.history.push("/error");
        });
    }
  };

  cancel = () => {
    this.props.history.push("/");
  };

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}

export default UserSignUp;
