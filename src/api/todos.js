import axios from "axios";

const baseUrl = 'Link：https://todo-list.alphacamp.io/api';
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config;
}, (error) => {
  console.error('[]', error)
});

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    return res.data.data;
  } catch (err) {
    console.error('[Get Todos failed]:', err);
  }
};

export const createTodo = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axiosInstance.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });

    return res.data.data;
  } catch (err) {
    console.error('[Greate Todos failed]:', err);
  }
};

export const updateTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });

    return res.data.data;
  } catch (err) {
    console.log('[Update Todos failed]:', err);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data.data
  } catch (err) {
    console.log('[Delete Todos failed]:', err);
  }
};