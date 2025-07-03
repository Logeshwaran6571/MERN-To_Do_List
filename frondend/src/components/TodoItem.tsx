import React, { useState } from 'react';
import { Check, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';
import { Todo } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, title: string, description?: string, priority?: 'low' | 'medium' | 'high') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onUpdate, onDelete, loading = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    
    try {
      await onUpdate(todo._id, editTitle.trim(), editDescription.trim() || undefined, editPriority);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const priorityDots = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };

  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg ${todo.completed ? 'opacity-75' : ''}`}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
          />
          <div className="flex items-center justify-between">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[editPriority]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!editTitle.trim() || loading}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggle(todo._id, !todo.completed)}
            disabled={loading}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
          >
            {todo.completed && <Check className="w-3 h-3" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${priorityDots[todo.priority]}`}></div>
              <h3 className={`font-medium text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </h3>
            </div>
            
            {todo.description && (
              <p className={`text-sm text-gray-600 mb-2 ${todo.completed ? 'line-through' : ''}`}>
                {todo.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
              
              <div className="flex gap-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(todo._id)}
                  disabled={loading}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;