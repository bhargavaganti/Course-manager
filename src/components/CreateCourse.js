import React, { Component } from "react";
import axios from "axios";

class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  };

  updateTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  updateDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  updateEstimatedTime = (e) => {
    this.setState({
      estimatedTime: e.target.value,
    });
  };

  updateMaterialsNeeded = (e) => {
    this.setState({
      materialsNeeded: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
    };
    axios
      .post("http://localhost:5000/api/courses", course)
      .then((res) => console.log(res.data));
  };

  handleCancel = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation error </h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>

                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    value={this.state.title}
                    onChange={this.updateTitle}
                  />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    value={this.state.description}
                    onChange={this.updateDescription}
                  />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        value={this.state.estimatedTime}
                        onChange={this.updateEstimatedTime}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        value={this.state.materialsNeeded}
                        onChange={this.updateMaterialsNeeded}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Create Course
              </button>
              <button
                className="button button-secondary"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;
