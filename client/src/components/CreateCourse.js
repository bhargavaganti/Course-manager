import React, { Component } from "react";
//import authenticateUser from "../../../api/middleware/authenticateUser";
import Form from "./Form";

class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    firstName: "",
    lastName: "",
    password: "",
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;
    console.log(context.authenticatedUser);
    this.setState({
      firstName: context.authenticatedUser.authUser.firstName,
      lastName: context.authenticatedUser.authUser.lastName,
    });
  }

  change = (e) => {
    e.persist();
    const value = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  submit = () => {
    const { context } = this.props;
    const emailAddress = context.authenticatedUser.authUser.emailAddress;
    const password = context.authenticatedUser.authUser.password;
    const userId = context.authenticatedUser.authUser.id;
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .createCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.message) {
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

  cancel = () => {
    this.props.history.push("/");
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
        <h1>Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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

export default CreateCourse;
