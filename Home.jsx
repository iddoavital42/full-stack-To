import React, { useState, useContext } from 'react';
import './Home.css';
import { TaskContext } from './TaskContext';

const Home = () => {
  const { tasks, addTask, deleteTask, editTask, toggleTaskStatus, clearTasks } = useContext(TaskContext);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.description.trim()) {
      addTask({ ...newTask, date: newTask.date || new Date(), status: 'In Progress' });
      setNewTask({ title: '', description: '', date: '' });
    }
  };

  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTask({ ...task });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTask(currentTask._id, currentTask.title, currentTask.description, currentTask.date, currentTask.status);
    setIsEditing(false);
    setCurrentTask(null);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newTask.date}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
        <button type="button" onClick={clearTasks} className="clear-button">Clear All Tasks</button>
      </form>

      {isEditing && (
        <form className="task-form" onSubmit={handleEditSubmit}>
          <h2>Edit Task</h2>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={currentTask.title}
            onChange={handleEditInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={currentTask.description}
            onChange={handleEditInputChange}
            required
          />
          <input
            type="date"
            name="date"
            value={currentTask.date ? currentTask.date.substring(0, 10) : ''}
            onChange={handleEditInputChange}
          />
          <button type="submit">Update Task</button>
          <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </form>
      )}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map(task => (
            <div key={task._id} className={`task-item ${task.status === 'Complete' ? 'completed' : ''}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Date:</strong> {new Date(task.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <div className="task-actions">
                <button onClick={() => toggleTaskStatus(task._id)}>
                  {task.status === 'Complete' ? 'Mark In Progress' : 'Mark Complete'}
                </button>
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
