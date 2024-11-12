import axios from "axios";

const api = process.env.REACT_APP_ASP_API;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${api}/api/Auth/login`, {
      userName: email,
      password,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
