import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import { getTasks } from "./services/api";

const App = () => {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [percentage, setPercentage] = useState(0); // NEW: progress percentage
  const location = useLocation();

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // NEW: update progress bar percentage whenever tasks change
  useEffect(() => {
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const total = tasks.length;
    const newPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    setPercentage(newPercentage);
  }, [tasks]);

  const hideSidebar =
    location.pathname.includes("/create") ||
    location.pathname.includes("/edit") ||
    location.pathname.includes("/task");

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && (
        <div className="w-60 bg-purple-100 p-4 space-y-4">
          <h2 className="text-lg font-semibold text-purple-800 mb-2">Filters</h2>
          {["All", "Pending", "In Progress", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`block w-full text-left px-3 py-2 rounded ${
                filter === status
                  ? "bg-purple-600 text-white"
                  : "text-purple-700 hover:bg-purple-200"
              }`}
            >
              {status}
            </button>
          ))}

          {/* Progress Tracker */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-purple-800 mb-1">
              Task Progress: {percentage}%
            </h3>
            <div className="w-full bg-purple-200 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">
            <Routes>
      <Route
        path="/"
        element={<TaskList filter={filter} tasks={tasks} fetchTasks={fetchTasks} />}
      />
      <Route
        path="/create"
        element={<TaskForm fetchTasks={fetchTasks} />}
      />
      <Route
        path="/edit/:id"
        element={<TaskForm fetchTasks={fetchTasks} />}
      />
      <Route
        path="/task/:id"
        element={<TaskDetails fetchTasks={fetchTasks} />}
      />
    </Routes>

      </div>
    </div>
  );
};

export default App;
