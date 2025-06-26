import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../services/api";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTaskById(id);
        setTask(res.data);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return <div className="text-center mt-8 text-purple-700">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow border border-purple-200">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Task Details</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Back
      </button>
    </div>
  );
};

export default TaskDetails;
