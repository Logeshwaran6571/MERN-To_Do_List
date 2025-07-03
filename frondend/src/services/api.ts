import axios from 'axios';

const API_BASE_URL = 'https://mern-to-do-list-backend-mu4w.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    }
    return Promise.reject(error);
  }
);

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export const todoApi = {
  // Get all todos
  getTodos: async (): Promise<ApiResponse<Todo[]>> => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Create new todo
  createTodo: async (todoData: {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
  }): Promise<ApiResponse<Todo>> => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: string, updateData: Partial<Todo>): Promise<ApiResponse<Todo>> => {
    const response = await api.put(`/todos/${id}`, updateData);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  // Toggle completion
  toggleTodo: async (id: string, completed: boolean): Promise<ApiResponse<Todo>> => {
    const response = await api.put(`/todos/${id}`, { completed });
    return response.data;
  },
};

export default api;
