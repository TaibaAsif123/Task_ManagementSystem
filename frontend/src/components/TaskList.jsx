import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/api";
import { Link } from "react-router-dom";

const TaskList = ({ filter }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewTask, setViewTask] = useState(null);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateTask(editTask._id, editTask);
      setTasks((prev) =>
        prev.map((task) => (task._id === res.data.data._id ? res.data.data : task))
      );
      setEditTask(null);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const filteredByStatus =
    filter === "All" || !filter
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const filteredTasks = filteredByStatus.filter((task) =>
    `${task.title} ${task.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-purple-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-purple-700">Task List</h1>

          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-gray-600 text-center">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 shadow border border-purple-200 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-purple-800 mb-1">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {task.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Status:{" "}
                    <span className="font-medium">{task.status}</span>
                  </p>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <button
                    onClick={() => setEditTask(task)}
                    className="text-purple-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setViewTask(task)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/create"
        className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition"
        title="Create Task"
      >
        +
      </Link>

      {/* View Modal */}
      {viewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setViewTask(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-purple-700 mb-2">
              {viewTask.title}
            </h2>
            <p className="text-gray-700 mb-2">{viewTask.description}</p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {viewTask.status}
            </p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
          >
            <button
              onClick={() => setEditTask(null)}
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-purple-700 mb-4">Edit Task</h2>

            <input
              type="text"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Title"
              required
            />
            <textarea
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Description"
              required
            />
            <select
              value={editTask.status}
              onChange={(e) =>
                setEditTask({ ...editTask, status: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskList;
