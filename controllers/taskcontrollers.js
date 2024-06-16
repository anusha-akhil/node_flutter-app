const Task = require("../models/taskModel.js");
const HttpStatusCode = require("../utils/httpStatusCode.js");
const httpstatuscode = require("../utils/httpStatusCode.js");

const tasks = [
  {
    id: 1,
    text: "Doctor Appointment",
    day: "Feb 5th at 2:30 pm",
    reminder: true,
  },
  {
    id: 2,
    text: "Meeting at school",
    day: " Feb 6th at 10 am",
    reminder: false,
  },
];
const getalltask = async (req, res) => {
  try {
    const allTasks = Task.find({});
    ///remove _v from result
    const result = await allTasks.select("-__v");
    res.status(httpstatuscode.OK).json({
      status: "Sucess",
      results: result.length,
      // tasks:tasks
      data: {
        tasks: result,
      },
    });
  } catch (err) {
    res.status(httpstatuscode.NOT_FOUND).json({
      status: "failed",
      err,
    });
  }
};

///////////////////////////////
const getSingleTask = async (req, res) => {
  try {
    console.log(req.params);
    // const id = parseInt(req.params.id);
    // var task = tasks.find((item) => item.id === id);
    const taskId = req.params.id;
    const result = Task.findById(taskId);
    const task = await result.select("-__v");
    res.status(httpstatuscode.OK).json({
      status: "success",
      results: 1,
      requestTime:req.requestTime,
      data: {
        tasks: task,
      },
    });
  } catch (err) {
    res.status(httpstatuscode.NOT_FOUND).json({
      status: "failed",
      err,
    });
  }
};
///////////////////////////////////
const createTask = async (req, res) => {
  try {
    console.log(req.body);
    // const id = tasks.length + 1;
    // const newTask = {
    //   id,
    //   ...req.body,
    // };
    // tasks.push(newTask);
    // console.log(req.body);
    const newtask = await Task.create(req.body);
    res.status(httpstatuscode.CREATED).json({
      status: "Sucess",
      data: {
        tasks: newtask,
      },
    });
  } catch (err) {
    res.status(httpstatuscode.BAD_REQUEST).json({
      status: "failed",
      err,
    });
  }
};
/////////////////////////////
const updateTask = async (req, res) => {
  try {
    const taskid = req.params.id;
    // const id = parseInt(req.params.id);

    // if (!tasks[id - 1]) {
    //   res.status(httpstatuscode.NOT_FOUND).json({
    //     status: "failed",
    //     message: "task not found",
    //   });
    // }
    // tasks[id - 1].text = req.body.text;
    // // tasks[id - 1]= {
    // //     id,
    // //     ...req.body
    // // }
    // var task = tasks.find((item) => item.id === id);

    // console.log(tasks);
    const task = await Task.findByIdAndUpdate(taskid, req.body, { new: true });
    res.status(httpstatuscode.OK).json({
      status: "Sucess",
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(httpstatuscode.NOT_FOUND).json({
      status: "failed",
      err,
    });
  }
};

/////////////////////////////////
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.status(httpstatuscode.NO_CONTENT).json({
      status: "success",
      data: {
        tasks: tasks,
      },
    });
  } catch (err) {
    res.status(httpstatuscode.NOT_FOUND).json({
      status: "failed",
      err,
    });
  }
  // const id = parseInt(req.params.id);
  // if (!tasks[id - 1]) {
  //   res.status(httpstatuscode.NOT_FOUND).json({
  //     status: "failed",
  //     message: "task not found",
  //   });
  // }
  // tasks.splice(id - 1, 1);
};
///////////////////////
const putTask = (req, res) => {
  const body = req.body;
  const id = req.body.id;
  var task = tasks.find((item) => item.id === body.id);
  if (task) {
    tasks[id - 1].id = id;
    tasks[id - 1].text = body.text;
  } else {
    const id = tasks.length + 1;
    const newTask = {
      id,
      ...req.body,
    };
    tasks.push(newTask);
  }
  res.status(httpstatuscode.CREATED).json({
    status: "success",
    data: {
      tasks: tasks,
    },
  });
};

module.exports = {
  getalltask,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  putTask,
};
