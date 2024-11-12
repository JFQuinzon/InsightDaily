import axios from "axios";

const api = process.env.REACT_APP_ASP_API;

export const registerUser = async (displayName, email, password) => {
  try {
    const response = await axios.post(`${api}/api/Auth/register`, {
      displayName,
      email,
      password,
    });
    return { data: response.data, error: null };
  } catch (error) {
    const errors = error.response.data.errors;
    return { data: null, errors };
  }
};
