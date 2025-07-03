import React from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Todo } from '../services/api';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, title: string, description?: string, priority?: 'low' | 'medium' | 'high') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onUpdate, onDelete, loading = false }) => {
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const stats = {
    total: todos.length,
    completed: completedTodos.length,
    pending: pendingTodos.length
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Circle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Circle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Circle className="w-5 h-5 text-yellow-500" />
            Pending Tasks ({pendingTodos.length})
          </h2>
          <div className="space-y-3">
            {pendingTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Completed Tasks ({completedTodos.length})
          </h2>
          <div className="space-y-3">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;