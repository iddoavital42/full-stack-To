import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const addTask = (task) => {
    axios.post('http://localhost:4000/tasks', task)
      .then(response => {
        setTasks([...tasks, response.data]);
        console.log('Task added:', response.data);
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:4000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
        console.log('Task deleted:', id);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const editTask = (id, newTitle, newDescription, newDate, newStatus) => {
    axios.put(`http://localhost:4000/tasks/${id}`, { 
      title: newTitle, 
      description: newDescription, 
      date: newDate, 
      status: newStatus 
    })
    .then(response => {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === id ? response.data : task
        )
      );
      console.log('Tasks after editing:', response.data);
    })
    .catch(error => {
      console.error('Error editing task:', error);
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, clearTasks, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};
