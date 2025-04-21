import React, { useContext } from "react";
import "./TaskComplete.css";
import { TaskContext } from "./TaskContext";

const TaskComplete = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="complete-task">
      <h1>Task Complete</h1>
      <p>My Completed Tasks</p>
      <div className="task-list">
        {tasks.filter(task => task.status === "Complete").map(task => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Date:</strong> {new Date(task.date).toLocaleDateString()}</p>
            <span style={{ textDecoration: "line-through" }}>{task.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskComplete;
