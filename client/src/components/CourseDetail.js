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

    /*context.data
      .deleteCourse(id, emailAddress, password)
      .then((res) => (window.location.href = "/"));*/

    context.data.deleteCourse(id, emailAddress, password).then((errors) => {
      console.log(errors);
      if (errors) {
        this.setState({ errors });
      } else {
        this.props.history.push("/");
      }
    });
  };

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const authUserId = context.authenticatedUser.id;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      firstName,
      lastName,
    } = this.state;
    //console.log(userId);
    //console.log(authUser);
    //console.log(authUserId);
    return (
      <div>
        <div className="actions-bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to="">
                  Update Course
                </Link>

                <button className="button" to="/" onClick={this.deleteCourse}>
                  Delete Course
                </button>
              </span>

              <a className="button button-secondary" href="/">
                Return to List
              </a>
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
