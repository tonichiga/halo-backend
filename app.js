const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// view engine setup
app.use(cookieParser(123));
app.use(helmet());
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json({ limit: 15000 })); // лимит объема файла (можно увеличить или удалить)
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const code = err.status || 500;
  const status = err.status ? "error" : "fail";
  // render the error page
  res.status(code).json({ status, code: 500, message: err.message });
  res.render("error");
});

module.exports = app;
