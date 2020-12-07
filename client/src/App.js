import React from "react";
import "./App.css";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Header from "./components/Header";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const HeaderWithContext = withContext(Header);
const App = () => {
  return (
    <Router>
      <div className="App">
        <HeaderWithContext />
        <Switch>
          <Route path="/" exact component={Courses} />
          <PrivateRoute
            path="/courses/create"
            exact
            component={CreateCourseWithContext}
          />
          <PrivateRoute
            path="/courses/:id"
            component={CourseDetailWithContext}
          />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
