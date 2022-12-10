import axios from 'axios';

const authUrl = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  console.log(username, password)

  try {
    const { data } = await axios.post(`${authUrl}/login`, {
      username,
      password
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    console.log(data);

    return data;
  } catch (err) {
    console.error('[Login Failed]:', err);
  }
}

export const register = async ({ username, email, password }) => {
  const { data } = await axios.post(`${authUrl}/register`, {
    username,
    email,
    password,
  });

  try {
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
    console.error('[Register Failed]:', err);
  }
}

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer' + authToken
      }
    });

    return response.data.success;
  } catch (err) {
    console.error('[Test Token Failed]:', err);
  }

}