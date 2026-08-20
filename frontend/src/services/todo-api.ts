import axios from 'axios';
import { Todo, NewTodo } from '../types/todo';

const API_BASE = '/api/todo'; // Getting the API base URL

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const res = await axios.get<Todo[]>(API_BASE);
    return res.data;
  },

  create: async (todo: NewTodo): Promise<Todo> => {
    const res = await axios.post<Todo>(API_BASE, todo);
    return res.data;
  },

  update: async (todo: Todo): Promise<Todo> => {
    const res = await axios.put<Todo>(`${API_BASE}/${todo.id}`, todo);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
  },
};