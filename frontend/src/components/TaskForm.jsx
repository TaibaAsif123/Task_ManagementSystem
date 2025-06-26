import React, { useState, useEffect } from "react";
import { createTask, getTaskById, updateTask, getTasks } from "../services/api";

const TaskForm = ({ taskId, onClose, setTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTaskById(taskId);
        const { title, description, dueDate, status } = res.data.data;
        setFormData({
          title,
          description,
          dueDate: dueDate?.substring(0, 10),
          status,
        });
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await updateTask(taskId, formData);
      } else {
        await createTask(formData);
      }

      if (setTasks) {
        const res = await getTasks();
        setTasks(res.data.data);
      }

      onClose(); // Close modal after submission
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl p-6 sm:p-8 rounded-xl w-full max-w-2xl border border-purple-200 relative">
        <button
          className="absolute top-3 right-3 text-purple-600 hover:text-purple-800 text-lg font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-purple-700 text-center">
          {taskId ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm mb-1 text-purple-800">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-purple-300 p-2 rounded outline-purple-500 text-sm"
              placeholder="e.g. Finish project report"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1 text-purple-800">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-purple-300 p-2 rounded outline-purple-500 text-sm"
              placeholder="Brief description of the task"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block font-medium text-sm mb-1 text-purple-800">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border border-purple-300 p-2 rounded outline-purple-500 text-sm"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block font-medium text-sm mb-1 text-purple-800">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-purple-300 p-2 rounded outline-purple-500 text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition text-sm sm:text-base"
          >
            {taskId ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
