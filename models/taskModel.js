const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please Add a text value"],
    unique : true
  },
  day: {
    type: Date,
    default :Date.now
  },
  reminder: {
    type: Boolean,
    required: [true, "Please Add a remider value"],
  },
//   createdAt: Date,
//   updatedAt: Date,
},{
timestamps :true

});
const Task=mongoose.model('Task',taskSchema);
module.exports=Task;