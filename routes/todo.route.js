const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const TodoController = require("../controllers/todo.controller");

router.post(
  "/",
  (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw {
          status: 401,
          message: "Unauthorized request",
        };
      } else {
        const user = jwt.decode(req.headers.authorization);
        if (user) {
          req.user = user;
          next();
        } else {
          throw {
            status: 401,
            message: "Unauthorized request",
          };
        }
      }
    } catch (err) {
      next(err);
    }
  },
  (req, res, next) => {
    const errors = [];
    if (!req.body.name) {
      errors.push("Name is required");
    }
    if (!req.body.schedule) {
      errors.push("Schedule is required");
    }
    if (req.body.completed !== true && req.body.completed !== false) {
      errors.push("Completed is required");
    }
    if (new Date(req.body.schedule) < new Date()) {
      errors.push("Schedule should be greater than today");
    }
    if (errors.length > 0) {
      next({
        status: 400,
        message: errors,
      });
    } else {
      next();
    }
  },
  TodoController.create
);
router.get(
  "/",
  (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw {
          status: 401,
          message: "Unauthorized request",
        };
      } else {
        const user = jwt.decode(req.headers.authorization);
        if (user) {
          req.user = user;
          next();
        } else {
          throw {
            status: 401,
            message: "Unauthorized request",
          };
        }
      }
    } catch (err) {
      next(err);
    }
  },
  TodoController.list
);

module.exports = router;
