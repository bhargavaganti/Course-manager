import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactMarkDown from "react-markdown";
import { Link } from "react-router-dom";

class CourseDetail extends Component {
  state = {
    courseDetail: {
      id: "",
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userId: "",
      owner: {
        firstName: "",
        lastName: "",
        emailAddress: "",
      },
    },
    errors: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const { context } = this.props;
    const userId = context.authenticatedUser.id;
    context.data
      .getCourseDetails(id)
      .then((data) => {
        if (data) {
          this.setState({
            id: data.id,
            title: data.title,
            description: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded,
            userId: userId,
            owner: data.owner,
            firstName: data.owner.firstName,
            lastName: data.owner.lastName,
            emailAddress: data.owner.emailAddress,
          });
        } else {
          this.props.history.push("/notFound");
        }
      })
      .catch((error) => {
        this.props.history.push("/errors");
      });
  }

  deleteCourse = () => {
    const id = this.props.match.params.id;
    const { context } = this.props;
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;

    context.data
      .deleteCourse(id, emailAddress, password)
      .then((errors) => {
        if (errors.length > 0) {
          this.setState({ errors });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  render() {
    const { context } = this.props;
    const userId = context.authenticatedUser.id;
    const authUser = context.authenticatedUser;
    const authUserId = context.authenticatedUser.id;
    const id = this.props.match.params.id;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      firstName,
      lastName,
    } = this.state;

    return (
      <div>
        <div className="actions-bar">
          <div className="bounds">
            <div className="grid-100">
              {authUser && authUserId === userId ? (
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
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <a className="button button-secondary" href="/">
                    Return to List
                  </a>
                </React.Fragment>
              )}
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{title}</h3>
                  <p>
                    By {firstName} {lastName}
                  </p>
                </div>
                <div className="course--description">
                  <ReactMarkDown source={description} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>

                      <ReactMarkDown source={materialsNeeded} />
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
