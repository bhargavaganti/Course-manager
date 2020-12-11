import React, { Component } from "react";

export default class UpdateCourse extends Component {
  state = {
    course: {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
    },
  };

  componentDidMount() {
    const { context } = this.props;
  }

  render() {
    return (
      <div className="bounds course--detail">
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
