import React, { Component } from "react";
import Form from "./Form";

class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  change = (e) => {
    e.persist();
    const value = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in`);
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

  render() {
    const { emailAddress, password, errors } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={this.change}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.change}
                />
              </React.Fragment>
            )}
          />
        </div>
      </div>
    );
  }
}

export default UserSignIn;
