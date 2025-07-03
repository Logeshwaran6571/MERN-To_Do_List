import { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import { todoApi, Todo } from './services/api';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await todoApi.getTodos();
      if (response.success && response.data) {
        setTodos(response.data);
      } else {
        setError(response.message || 'Failed to load todos');
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      setError('Failed to connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const handleAddTodo = async (title: string, description?: string, priority?: 'low' | 'medium' | 'high') => {
    try {
      const response = await todoApi.createTodo({ title, description, priority });
      if (response.success && response.data) {
        setTodos(prev => [response.data!, ...prev]);
      } else {
        setError(response.message || 'Failed to create todo');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      setError('Failed to create todo. Please try again.');
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await todoApi.toggleTodo(id, completed);
      if (response.success && response.data) {
        setTodos(prev => prev.map(todo => 
          todo._id === id ? response.data! : todo
        ));
      } else {
        setError(response.message || 'Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  // Update todo
  const handleUpdateTodo = async (id: string, title: string, description?: string, priority?: 'low' | 'medium' | 'high') => {
    try {
      const response = await todoApi.updateTodo(id, { title, description, priority });
      if (response.success && response.data) {
        setTodos(prev => prev.map(todo => 
          todo._id === id ? response.data! : todo
        ));
      } else {
        setError(response.message || 'Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await todoApi.deleteTodo(id);
      if (response.success) {
        setTodos(prev => prev.filter(todo => todo._id !== id));
      } else {
        setError(response.message || 'Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MERN Todo App
            </h1>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={loadTodos} />
          </div>
        )}

        {/* Todo Input */}
        <TodoInput onAddTodo={handleAddTodo} loading={loading} />

        {/* Todo List */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

export default App;