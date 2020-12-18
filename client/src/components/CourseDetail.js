import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactMarkDown from "react-markdown";
import { Link } from "react-router-dom";

class CourseDetail extends Component {
  state = {
    course: [],
    owner: [],
  };
  //Retrieve the course details when the course is clicked upon
  componentDidMount() {
    const id = this.props.match.params.id;
    const { context } = this.props;
    context.data
      .getCourseDetails(id)
      .then((data) => {
        const course = data;
        const owner = data.owner;

        if (data) {
          this.setState({
            course,
          });
          this.setState({ owner });
        } else {
          this.props.history.push("/notFound");
        }
      })
      .catch((error) => {
        this.props.history.push("/errors");
      });
  }

  //Delete a course using the context method "deleteCourse" from data.js
  deleteCourse = () => {
    const id = this.props.match.params.id;
    const { context } = this.props;
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;

    context.data
      .deleteCourse(id, emailAddress, password)
      .then((res) => (window.location.href = "/"));
  };

  render() {
    //get the Authenticated user data from context
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    //get the current ID value
    const id = this.props.match.params.id;

    return (
      <div>
        <div className="actions-bar">
          <div className="bounds">
            <div className="grid-100">
              {/**Renders the update and delete buttons if the authenticated user is the owner of the course */}
              {authUser && authUser.id === this.state.owner.id ? (
                <React.Fragment>
                  <span>
                    <Link className="button" to={`/courses/${id}/update`}>
                      Update Course
                    </Link>

                    <button
                      className="button"
                      to="/"
                      onClick={this.deleteCourse}
                    >
                      Delete Course
                    </button>
                  </span>
                  <Link className="button button-secondary" to="/">
                    Return to List
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link className="button button-secondary" to="/">
                    Return to List
                  </Link>
                </React.Fragment>
              )}
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{this.state.course.title}</h3>
                  <p>
                    {`By ${this.state.owner.firstName} ${this.state.owner.lastName}`}
                  </p>
                </div>
                <div className="course--description">
                  <ReactMarkDown source={this.state.course.description} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{this.state.course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>

                      <ReactMarkDown
                        source={this.state.course.materialsNeeded}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(CourseDetail);
