import axios from "axios";

const api = process.env.REACT_APP_ASP_API;

export const createBookmark = async (formData, accessToken) => {
  try {
    const response = await axios.post(`${api}/api/bookmark/create`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    const errors = error.response?.data?.errors || error.message;
    return { data: null, errors };
  }
};
