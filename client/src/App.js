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
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";
import UpdateCourse from "./components/UpdateCourse";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

const UpdateCourseWithContext = withContext(UpdateCourse);
const CoursesWithContext = withContext(Courses);
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
          <Route path="/" exact component={CoursesWithContext} />
          <PrivateRoute
            path="/courses/create"
            exact
            component={CreateCourseWithContext}
          />

          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
