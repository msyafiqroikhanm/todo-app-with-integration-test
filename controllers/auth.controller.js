const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  static async login(req, res, next) {
    console.log(req.body);
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          "indonesia"
        );

        res.status(200).json({
          token,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
