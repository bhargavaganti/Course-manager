const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const { sequelize, models } = require("../db");

const { User } = models;

const authenticateUser = require("../middleware/authenticateUser");
const { useReducer } = require("react");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
//Send a GET request to /users to READ the current authenticated user

router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const authUser = req.currentUser;
    delete authUser.dataValues.password;
    delete authUser.dataValues.createdAt;
    delete authUser.dataValues.updatedAt;
    res.json({
      authUser,
    });
  })
);

//Send a POST  request to /users to CREATE  a user
router.post(
  "/users",
  asyncHandler(async (req, res, next) => {
    const user = req.body;
    try {
      if (user) {
        if (user.password !== "") {
          // if (req.body.password !== req.body.confirmpassword) {
          //   throw Error("password do not match");
          // }
          //Hashing the user password before persisting the data in the database
          user.password = bcryptjs.hashSync(user.password, 10);
        }

        await User.create({
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          password: user.password,
        });

        res.status(201).location("/").end();
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        console.error("Validation errors: ", errors);
        next(error);
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
