const express = require("express");
const morgan =require('morgan');
const httpstatuscode = require("./utils/httpStatusCode.js");
const {
  getalltask,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  putTask,
} = require("./controllers/taskcontrollers.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const HttpStatusCode = require("./utils/httpStatusCode.js");
dotenv.config({ path: "./.env" });
//express app
const app = express();
app.use(express.json());
//custom middleware
app.use(morgan('tiny'));
app.use((req, res, next) => {
  // req.requestTime = new Data().toISOString();
  // console.log(req.requestTime);
  next();
});
// express env
// console.log(app.get('env'));
// // node env
// console.log(process.env);

app.get("/", (req, res) => {
  res.send("hello worrld");
});

// get all tasks

app.get("/api/v1/tasks", getalltask);

// get a single task by id

app.get("/api/v1/tasks/:id", getSingleTask);

//create task
app.post("/api/v1/tasks", createTask);

//update task

app.patch("/api/v1/tasks/:id", updateTask);

//delete task

app.delete("/api/v1/tasks/:id", deleteTask);

////////put request////////////////////////////
app.put("/api/v1/tasks", putTask);

//error handler
app.all("*", (req, res, next) => {
  // res.status(HttpStatusCode.NOT_FOUND).json({
  //   status: "failed",
  //   message: `The api ${req.originalUrl} not found`,
  // });
  const err = new Error(`The api ${req.originalUrl} not found`);
  err.status = "fail";
  err.statusCode = HttpStatusCode.NOT_FOUND;
  next(err);
});

//error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
//setup the db connection string
const DB = process.env.MONGO_DB_CONNECTION.replace(
  "<PASSWORD>",
  process.env.MONGO_DB_PASSWORD
);

//connect to db
mongoose
  .connect(
    "mongodb+srv://anushak9411:taskdb.@cluster0.6fvugdv.mongodb.net/Tasks?"
  )
  .then(() => console.log("DB connction success"))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("listen to port 3000"));
