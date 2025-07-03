import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: todos,
      message: 'Todos retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
});

// GET single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    res.json({
      success: true,
      data: todo,
      message: 'Todo retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
});

// POST create new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const todo = new Todo({
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium'
    });

    const savedTodo = await todo.save();
    res.status(201).json({
      success: true,
      data: savedTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
});

// PUT update todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;
    
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority;
    updateData.updatedAt = Date.now();

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
});

export default router;