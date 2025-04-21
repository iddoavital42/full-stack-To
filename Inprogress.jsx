import React, { useContext } from 'react';
import './Inprogress.css';
import { TaskContext } from './TaskContext';

const Inprogress = () => {
  const { tasks, editTask, deleteTask } = useContext(TaskContext);

  const handleDone = (task) => {
    const newStatus = task.status === "In Progress" ? "Complete" : "In Progress";
    editTask(task._id, task.title, task.description, task.date, newStatus);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div className="in-progress">
      <h1>In Progress</h1>
      <p>The tasks that are in progress:</p>
      <div className="task-list">
        {tasks.filter(task => task.status === "In Progress").map(task => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Date:</strong> {new Date(task.date).toLocaleDateString()}</p>
            <button onClick={() => handleDone(task)}>Mark Complete</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inprogress;
