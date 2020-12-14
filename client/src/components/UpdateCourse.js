import React, { Component } from "react";

import Form from "./Form";

export default class UpdateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
    firstName: "",
    lastName: "",
    errors: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { context } = this.props;
    //get authenticate user id
    const authID = context.authenticatedUser.id;
    this.setState({
      firstName: context.authenticatedUser.firstName,
      lastName: context.authenticatedUser.lastName,
    });

    context.data
      .getCourseDetails(id)
      .then((data) => {
        //console.log(data);
        const course = data;
        //console.log(course);
        if (data) {
          const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
          } = course;

          this.setState({
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
          });
        }
      }) //handle server error
      .catch((error) => {
        this.props.history.push("/error");
      });
  }

  //handle cancel button
  cancel = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/courses/${id}`);
  };

  //update states value
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handleSubmit function

  submit = () => {
    const { id } = this.props.match.params;
    //get context
    const { context } = this.props;
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const authUserId = context.authenticatedUser.id;
    //get course props from state
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    } = this.state;

    //create a new payload
    const updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .updateCourse(id, updatedCourse, emailAddress, password)
      .then((errors) => {
        if (errors.length > 0) {
          this.setState({ errors });
        } else {
          this.props.history.push("/");
        }
      }) //handle server error
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      firstName,
      lastName,
      errors,
    } = this.state;
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            submit={this.submit}
            errors={errors}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      value={title}
                      onChange={this.change}
                    />
                    <p>
                      By {firstName} {lastName}
                    </p>
                  </div>
                  <div className="course--description">
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder="Course description..."
                      value={description}
                      onChange={this.change}
                    />
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course-stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          value={estimatedTime}
                          onChange={this.change}
                        />
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          className=""
                          placeholder="List materials..."
                          value={materialsNeeded}
                          onChange={this.change}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    );
  }
}
