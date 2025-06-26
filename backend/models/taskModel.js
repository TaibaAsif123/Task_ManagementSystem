import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:true,
    },
    description:{

      type:String,
     default:'',
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    DueDate:{
      type:Date,
    },

  },
  {
    timestamps:true //created at updated at
  }
);

const Task=mongoose.model('Task', taskSchema);
export default Task;