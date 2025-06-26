import Task from "../models/taskModel.js";

//CREATE TASK:

export const createTask = async (req, res) => {
  // extract fields from request body
  const { title, description, status, dueDate } = req.body;

  // check if title is missing
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  // create new task using model
  const newTask = new Task({ title, description, status, dueDate });

  // save to database
  // send response back
 try {
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error in Creating Task:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

};

//GET ALL TASKS

export const getAllTasks=async(req,res)=>{

  try{
    const tasks=await Task.find();

    res.status(200).json({success:true, data:tasks}); 
  }catch(error){
    console.error("Error fetching data, error.message");
    res.status(500).json({success:false,message:"Server Error"});
  }
  
};


// GET BY ID:

export const getTaskById = async (req, res) => {
  const { id } = req.params; // Extract ID from URL

  try {
    const task = await Task.findById(id); // Find task by _id

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.error("Error fetching task:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//UPDATE TASKS:

export const updateTask = async (req, res) => {
  const { id } = req.params; // Extract ID from URL
  const data=req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,data,
      { new: true, runValidators: true } // return updated doc & validate fields
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//DELETE A TASK

export const deleteTask = async (req, res) => {
  const { id } = req.params; // Extract task ID from URL

  try {
    const deletedTask = await Task.findByIdAndDelete(id); // Delete task by ID

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
