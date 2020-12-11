const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const { sequelize, models } = require("../db");

const { User } = models;

const authenticateUser = require("../middleware/authenticateUser");

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
    const user = req.currentUser;
    res.json({
      //authUser,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password,
      id: user.id,
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
          //Hashing the user password before persisting the data in the database
          user.password = bcryptjs.hashSync(user.password);
        }

        const result = await User.build({
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          password: user.password,
        });

        await result.save();

        res
          .status(201)
          .json({ message: "created successful", response: result });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((err) => err.message);
        console.error("Validation errors: ", errors);
        res.status(400).json({ errors });
      } else if (err.name === "SequelizeUniqueConstraintError") {
        const errors = err.errors.map((err) => err.message);
        console.error("Validation errors: ", errors);
        res.status(409).json({ errors });
      } else {
        throw err;
      }
    }
  })
);
module.exports = router;
