const bcrypt = require("bcryptjs");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const app = require("../app");
const jwt = require("jsonwebtoken");

let token;
beforeEach(async () => {
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

  await queryInterface.bulkInsert("Todos", [
    {
      userId: 1,
      name: "Latihan Test",
      schedule: "2022-06-06",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  token = jwt.sign({ id: 1, email: "syafiq@mail.com" }, "indonesia", {
    expiresIn: "1h",
  });
});

afterEach(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
  });

  await queryInterface.bulkDelete("Todos", null, {
    truncate: true,
    restartIdentity: true,
  });
});

//skenario
describe("POST Todo", () => {
  it("success", (done) => {
    request(app)
      .post("/todos")
      .set("authorization", token)
      .send({
        name: "Melakukan testing API",
        schedule: "2022-06-06",
        completed: false,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Successfully create todo");
          done();
        }
      });
  });

  it("No Authorization Token", (done) => {
    request(app)
      .post("/todos")
      .send({
        name: "Melakukan testing API",
        schedule: "2022-06-06",
        completed: false,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Unauthorized request");
          done();
        }
      });
  });

  it("Invalid Auth Token", (done) => {
    request(app)
      .post("/todos")
      .set("authorization", "asdasd")
      .send({
        name: "Melakukan testing API",
        schedule: "2022-06-06",
        completed: false,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Unauthorized request");
          done();
        }
      });
  });

  it("Required Field Violatoin", (done) => {
    request(app)
      .post("/todos")
      .set("authorization", token)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message.length).toBe(3);
          expect(res.body.message.includes("Name is required")).toBe(true);
          expect(res.body.message.includes("Schedule is required")).toBe(true);
          expect(res.body.message.includes("Completed is required")).toBe(true);
          done();
        }
      });
  });

  it("Schedule Violation", (done) => {
    request(app)
      .post("/todos")
      .set("authorization", token)
      .send({
        name: "Melakukan testing API",
        schedule: "2022-01-01",
        completed: false,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message.length).toBe(1);
          expect(
            res.body.message.includes("Schedule should be greater than today")
          ).toBe(true);
          done();
        }
      });
  });
});

describe("GET Todo", () => {
  it("Success", (done) => {
    request(app)
      .get("/todos")
      .set("authorization", token)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(Array.isArray(res.body)).toBe(true);
          done();
        }
      });
  });

  it("No Auth Token", (done) => {
    request(app)
      .get("/todos")
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Unauthorized request");
          done();
        }
      });
  });

  it("Invalid Token", (done) => {
    request(app)
      .get("/todos")
      .set("authorization", "asdasd")
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Unauthorized request");
          done();
        }
      });
  });
});
