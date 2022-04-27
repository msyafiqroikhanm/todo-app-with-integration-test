const bcrypt = require("bcryptjs");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const app = require("../app");

//hook
beforeEach(async () => {
  // memasukkan data dummy ke database testing
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("asdlkj", salt);
  await queryInterface.bulkInsert("Users", [
    {
      email: "syafiq@mail.com",
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterEach(async () => {
  await queryInterface.bulkDelete(
    "Users",
    {},
    { truncate: true, restartIdentity: true }
  );
});

//skenario
describe("Login API", () => {
  it("Success", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "syafiq@mail.com",
        password: "asdlkj",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("token");
          done();
        }
      });
  });

  it("Wrong Password", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "syafiq@mail.com",
        password: "asdfgh",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Invalid email or password");
          done();
        }
      });
  });

  it("Wrong Email", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "syafiq@mail",
        password: "asdlkj",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Invalid email or password");
          done();
        }
      });
  });
});
