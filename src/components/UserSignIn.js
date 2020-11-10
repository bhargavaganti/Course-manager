import React from "react";

const UserSignIn = () => {
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
};

export default UserSignIn;
