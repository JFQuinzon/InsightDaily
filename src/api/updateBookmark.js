import axios from "axios";

const api = process.env.REACT_APP_ASP_API;

export const updateBookmark = async (id, formData, accessToken) => {
  try {
    const response = await axios.put(
      `${api}/api/bookmark/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errors = error.response?.data?.errors || error.message;
    return { data: null, errors };
  }
};
