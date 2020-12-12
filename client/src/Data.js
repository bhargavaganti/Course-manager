import config from "./config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    //check if auth is required
    if (requiresAuth) {
      // Using bota to encode the emailAddress and password of the authenticated user
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );

      options.headers["Authorization"] = `Basic ${encodedCredentials} `;
    }

    return fetch(url, options);
  }

  //GET call to get courses
  async getCourse() {
    const response = await this.api("/courses", "GET", null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  //GET call to get users
  async getUser(emailAddress, password) {
    const response = await this.api("/users", "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  //GET a specific course using the course ID
  async getCourseDetails(id) {
    const response = await this.api(`/courses/${id}`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 404) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //POST call to CREATE a new user
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400 || response.status === 409) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //POST call to CREATE a new course
  async createCourse(course, emailAddress, password) {
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //UPDATE a specific course using the course ID
  async updateCourse(id, updatedCourse, emailAddress, password) {
    const response = await this.api(
      `/courses/${id}`,
      "PUT",
      updatedCourse,
      true,
      {
        emailAddress,
        password,
      }
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // DELETE call to DELETE a specific course using the course ID
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 401) {
      return response.json().then((data) => {
        return data;
      });
    } else if (response.status === 403) {
      return response.json().then((data) => {
        return data;
      });
    } else {
      throw new Error();
    }
  }
}
