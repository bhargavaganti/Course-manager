import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import ReactMarkDown from "react-markdown";

class CourseDetail extends Component {
  state = {
    courseDetail: {
      owner: {},
      materialsNeeded: {},
    },
    errors: [],
  };

  componentDidMount() {
    this.getCourseDetails();
  }

  getCourseDetails = async () => {
    try {
      const id = this.props.match.params.id;
      const response = await axios.get(
        `http://localhost:5000/api/courses/${id}`
      );

      const data = await response.data;
      console.log(data);
      if (data) {
        this.setState({
          courseDetail: data,
          title: data.title,
          description: data.description,
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded,
          owner: data.owner,
          emailAddress: data.owner.emailAddress,
        });
      } else {
        this.props.history.push("/error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      courseDetail,
    } = this.state;
    return (
      <div>
        <div className="actions-bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <a className="button" href="update-course.html">
                  Update Course
                </a>
                <button
                  className="button"
                  onClick={() => this.deleteCourse(courseDetail.id)}
                >
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
                    By {courseDetail.owner?.firstName}{" "}
                    {courseDetail.owner?.lastName}
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
