import React, { Component } from "react";
import CourseDisplay from "./CourseDisplay";
import CreateCourseDisplay from "./CreateCourseDisplay";

export default class Courses extends Component {
  state = {
    courses: [],
  };
  //get all course  and display them when the page loads
  componentDidMount() {
    const { context } = this.props;
    context.data
      .getCourse()
      .then((data) => {
        if (data) {
          this.setState({ courses: data });
        }
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
  }

  render() {
    return (
      <div className="bounds">
        {this.state.courses.map((course) => (
          <CourseDisplay title={course.title} key={course.id} id={course.id} />
        ))}
        <CreateCourseDisplay />
      </div>
    );
  }
}
