// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://idrees786:<db_password>@cluster0.sfr7hr4.mongodb.net/?appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, default: 'work' },
    priority: { type: String, default: 'medium' },
    completed: { type: Boolean, default: false },
    dueDate: Date,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// Routes
// Get all tasks with filtering and sorting
app.get('/api/tasks', async (req, res) => {
    try {
        const { category, priority, completed, search, sortBy } = req.query;
        let filter = {};
        
        if (category && category !== 'all') filter.category = category;
        if (priority && priority !== 'all') filter.priority = priority;
        if (completed !== undefined) filter.completed = completed === 'true';
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        let sort = { createdAt: -1 };
        if (sortBy === 'priority') sort = { priority: 1, createdAt: -1 };
        if (sortBy === 'dueDate') sort = { dueDate: 1, createdAt: -1 };
        if (sortBy === 'title') sort = { title: 1 };

        const tasks = await Task.find(filter).sort(sort);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get task statistics
app.get('/api/tasks/stats', async (req, res) => {
    try {
        const stats = await Task.aggregate([
            {
                $group: {
                    _id: '$category',
                    total: { $sum: 1 },
                    completed: {
                        $sum: { $cond: ['$completed', 1, 0] }
                    },
                    highPriority: {
                        $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] }
                    }
                }
            }
        ]);
        
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ completed: true });
        const overdueTasks = await Task.countDocuments({
            dueDate: { $lt: new Date(), $exists: true },
            completed: false
        });

        res.json({
            categoryStats: stats,
            totalTasks,
            completedTasks,
            overdueTasks,
            completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new task
app.post('/api/tasks', async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Bulk operations
app.post('/api/tasks/bulk', async (req, res) => {
    try {
        const { action, ids } = req.body;
        let result;

        switch (action) {
            case 'delete':
                result = await Task.deleteMany({ _id: { $in: ids } });
                break;
            case 'complete':
                result = await Task.updateMany(
                    { _id: { $in: ids } },
                    { completed: true, updatedAt: new Date() }
                );
                break;
            case 'incomplete':
                result = await Task.updateMany(
                    { _id: { $in: ids } },
                    { completed: false, updatedAt: new Date() }
                );
                break;
            default:
                return res.status(400).json({ message: 'Invalid action' });
        }

        res.json({ message: 'Bulk operation completed', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});