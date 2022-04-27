const express = require("express");
const errorHandler = require("./errorHandler");
const app = express();
const port = 3000;
const routes = require("./routes/index.route");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.use(errorHandler);

module.exports = app;
