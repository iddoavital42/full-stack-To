const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;
const Schema = mongoose.Schema;


const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, (error) =>{
    if(!error){
        console.log("Server is running on port " + port);
    }else{
        console.log("Error" +  error);
    }
});

app.get('/', (req, res) =>{
   res.send("Express App is Running"); 
}); 
 
 
  main().catch(err => console.log(err));

 async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/to');  
   console.log("Connected to MongoDB");
    //await mongoose.connection.close();
 }
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String,
});

const Task = mongoose.model('Task', TaskSchema);

// create a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, date, status } = req.body;
        const newTask = new Task({
            title,
            description,
            date,
            status,
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// read tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// update task
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, date, status },
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// delete task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});
