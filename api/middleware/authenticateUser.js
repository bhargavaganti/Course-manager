const auth = require("basic-auth");
const bcryptjs = require("bcryptjs");

const { sequelize, models } = require("../db");

const { User } = models;
//custom middleware function for authenticating users
const authenticateUser = async (req, res, next) => {
  let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If a user was successfully retrieved from the data store...
  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });

    console.log(user);

    if (user) {
      const authenticated = bcryptjs.compareSync(
        credentials.pass,
        user.password
      );
      if (authenticated) {
        req.currentUser = user;
      } else {
        message = `Authentication failure for user: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }

  // If user authenticaion failed...
  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};

module.exports = authenticateUser;
