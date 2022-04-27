const jwt = require("jsonwebtoken");
const { Todo } = require("../models");

class TodoController {
  static async create(req, res, next) {
    try {
      await Todo.create({
        name: req.body.name,
        schedule: req.body.schedule,
        completed: req.body.completed,
        userId: req.user.id,
      });
      res.status(201).json({ message: "Successfully create todo" });
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    const todos = await Todo.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: ["name", "completed"],
    });

    res.status(200).json(todos);
  }
}
module.exports = TodoController;
