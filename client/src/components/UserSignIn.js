import React, { Component } from "react";

class UserSignIn extends Component {
  state = {
    emailAddress: "",
    Password: "",
  };

  changeHandler = (e) => {
    e.persist();
    const value = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };
  render() {
    return (
      <div class="bounds">
        <div class="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  value=""
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  class=""
                  placeholder="Password"
                  value=""
                />
              </div>
              <div></div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSignIn;
