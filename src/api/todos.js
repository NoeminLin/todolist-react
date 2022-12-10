import axios from "axios";

const baseUrl = 'http://localhost:3004';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (err) {
    console.error('[Get Todos failed]:', err);
  }
};

export const createTodo = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axios.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });

    return res.data;
  } catch (err) {
    console.error('[Greate Todos failed]:', err);
  }
};

export const updateTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axios.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });

    return res.data;
  } catch (err) {
    console.log('[Update Todos failed]:', err);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`);
    return res.data
  } catch (err) {
    console.log('[Delete Todos failed]:', err);
  }
};