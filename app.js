var express = require("express");
var logger = require("morgan");
var app = express();

app.use(logger("dev"));
app.use(express.json());

const router = require("./routes/routes");
app.use("/api/v1", router);

module.exports = app;
