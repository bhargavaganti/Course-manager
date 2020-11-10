import React from "react";
import "./App.css";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Header from "./components/Header";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signout" component={UserSignOut} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
