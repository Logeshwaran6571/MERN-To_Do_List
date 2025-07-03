import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (title: string, description?: string, priority?: 'low' | 'medium' | 'high') => Promise<void>;
  loading?: boolean;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo, loading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await onAddTodo(title.trim(), description.trim() || undefined, priority);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            onFocus={() => setIsExpanded(true)}
          />
          <button
            type="submit"
            disabled={!title.trim() || loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top duration-200">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24 transition-all duration-200"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Priority:</span>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[priority]} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Collapse
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoInput;