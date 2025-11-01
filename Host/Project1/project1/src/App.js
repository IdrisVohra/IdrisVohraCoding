// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'work',
    priority: 'medium',
    dueDate: '',
    tags: ''
  });
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    completed: 'all',
    search: '',
    sortBy: 'createdAt'
  });
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [editingTask, setEditingTask] = useState(null);

  const categories = ['work', 'personal', 'shopping', 'health', 'education', 'finance'];
  const priorities = {
    low: { color: '#10b981', label: 'Low' },
    medium: { color: '#f59e0b', label: 'Medium' },
    high: { color: '#ef4444', label: 'High' },
    urgent: { color: '#dc2626', label: 'Urgent' }
  };

  // Calculate statistics from local tasks
  const calculateStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const overdueTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
    ).length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Category statistics
    const categoryStats = categories.map(category => ({
      _id: category,
      total: tasks.filter(task => task.category === category).length,
      completed: tasks.filter(task => task.category === category && task.completed).length
    }));

    return {
      totalTasks,
      completedTasks,
      overdueTasks,
      completionRate,
      categoryStats
    };
  };

  const stats = calculateStats();

  // Filter and sort tasks
  const getFilteredTasks = () => {
    let filtered = tasks.filter(task => {
      // Category filter
      if (filters.category !== 'all' && task.category !== filters.category) return false;
      
      // Priority filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      
      // Completed filter
      if (filters.completed !== 'all') {
        const completedFilter = filters.completed === 'true';
        if (task.completed !== completedFilter) return false;
      }
      
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const inTitle = task.title.toLowerCase().includes(searchTerm);
        const inDescription = task.description.toLowerCase().includes(searchTerm);
        const inTags = task.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        if (!inTitle && !inDescription && !inTags) return false;
      }
      
      return true;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'priority':
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        
        case 'title':
          return a.title.localeCompare(b.title);
        
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([task, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      category: 'work',
      priority: 'medium',
      dueDate: '',
      tags: ''
    });
  };

  // Update task
  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setSelectedTasks(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(taskId);
      return newSelected;
    });
  };

  // Bulk operations
  const handleBulkOperation = (action) => {
    if (selectedTasks.size === 0) return;

    setTasks(tasks.map(task => {
      if (selectedTasks.has(task.id)) {
        switch (action) {
          case 'complete':
            return { ...task, completed: true };
          case 'incomplete':
            return { ...task, completed: false };
          default:
            return task;
        }
      }
      return task;
    }));

    if (action === 'delete') {
      setTasks(tasks.filter(task => !selectedTasks.has(task.id)));
    }

    setSelectedTasks(new Set());
  };

  // Toggle task selection
  const toggleTaskSelection = (taskId) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  // Select all tasks
  const selectAllTasks = () => {
    if (selectedTasks.size === filteredTasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(filteredTasks.map(task => task.id)));
    }
  };

  // Check if task is overdue
  const isOverdue = (dueDate) => {
    return dueDate && new Date(dueDate) < new Date();
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🚀 Advanced Task Manager</h1>
          <p>Manage your tasks with powerful features</p>
        </header>

        {/* Enhanced Stats Dashboard */}
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>Total Tasks</h3>
            <span className="stat-number">{stats.totalTasks || 0}</span>
          </div>
          <div className="stat-card completed">
            <h3>Completed</h3>
            <span className="stat-number">{stats.completedTasks || 0}</span>
          </div>
          <div className="stat-card overdue">
            <h3>Overdue</h3>
            <span className="stat-number">{stats.overdueTasks || 0}</span>
          </div>
          <div className="stat-card progress">
            <h3>Completion Rate</h3>
            <span className="stat-number">{stats.completionRate ? stats.completionRate.toFixed(1) : 0}%</span>
          </div>
        </div>

        {/* Category Statistics */}
        <div className="category-stats">
          <h3>Tasks by Category</h3>
          <div className="category-bars">
            {stats.categoryStats?.map(stat => (
              stat.total > 0 && (
                <div key={stat._id} className="category-stat">
                  <span className="category-name">{stat._id}</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill" 
                      style={{ width: `${(stat.total / stats.totalTasks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="stat-count">{stat.total}</span>
                </div>
              )
            ))}
            {stats.totalTasks === 0 && (
              <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>
                No tasks yet. Add some tasks to see statistics!
              </p>
            )}
          </div>
        </div>

        {/* Enhanced Add Task Form */}
        <form onSubmit={addTask} className="task-form enhanced-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Task title *"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="task-input"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              className="task-input"
            />
          </div>
          
          <div className="form-row">
            <select 
              value={newTask.category}
              onChange={(e) => setNewTask({...newTask, category: e.target.value})}
              className="category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select 
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              className="priority-select"
            >
              {Object.entries(priorities).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <input
              type="datetime-local"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="date-input"
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newTask.tags}
              onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
              className="tags-input"
            />
          </div>

          <button type="submit" className="add-btn">
            ➕ Add Task
          </button>
        </form>

        {/* Enhanced Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="search-input"
            />
            
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              {Object.entries(priorities).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={filters.completed}
              onChange={(e) => setFilters({...filters, completed: e.target.value})}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="filter-select"
            >
              <option value="createdAt">Newest First</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTasks.size > 0 && (
          <div className="bulk-actions">
            <span>{selectedTasks.size} tasks selected</span>
            <button onClick={() => handleBulkOperation('complete')} className="bulk-btn complete">
              Mark Complete
            </button>
            <button onClick={() => handleBulkOperation('incomplete')} className="bulk-btn incomplete">
              Mark Incomplete
            </button>
            <button onClick={() => handleBulkOperation('delete')} className="bulk-btn delete">
              Delete Selected
            </button>
            <button onClick={() => setSelectedTasks(new Set())} className="bulk-btn cancel">
              Cancel
            </button>
          </div>
        )}

        {/* Enhanced Tasks List */}
        <div className="tasks-list">
          {filteredTasks.length > 0 && (
            <div className="list-header">
              <label className="select-all">
                <input
                  type="checkbox"
                  checked={selectedTasks.size === filteredTasks.length && filteredTasks.length > 0}
                  onChange={selectAllTasks}
                />
                Select All
              </label>
              <span>{filteredTasks.length} tasks found</span>
            </div>
          )}

          {filteredTasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
              <div className="task-main">
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  onChange={() => toggleTaskSelection(task.id)}
                  className="selection-checkbox"
                />
                
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => updateTask(task.id, { completed: !task.completed })}
                  className="completion-checkbox"
                />

                <div className="task-content">
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    <div className="task-actions">
                      <button 
                        onClick={() => setEditingTask(editingTask === task.id ? null : task.id)}
                        className="edit-btn"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="delete-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}

                  <div className="task-meta">
                    <span className={`category-tag ${task.category}`}>
                      {task.category}
                    </span>
                    <span 
                      className="priority-tag"
                      style={{ backgroundColor: priorities[task.priority]?.color }}
                    >
                      {priorities[task.priority]?.label}
                    </span>
                    {task.dueDate && (
                      <span className={`due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                        {isOverdue(task.dueDate) && ' ⚠️ Overdue'}
                      </span>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <div className="task-tags">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {editingTask === task.id && (
                    <div className="quick-edit">
                      <input
                        type="text"
                        defaultValue={task.title}
                        onBlur={(e) => updateTask(task.id, { title: e.target.value })}
                        className="edit-input"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="empty-state">
              <p>No tasks found. Add some tasks to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;