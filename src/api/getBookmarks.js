import axios from "axios";

export const getBookmarks = async (userId, accessToken) => {
  const api = process.env.REACT_APP_ASP_API;

  try {
    const response = await axios.get(
      `${api}/api/Bookmark/Bookmarks/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};
