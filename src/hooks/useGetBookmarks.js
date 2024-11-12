import { useState, useEffect, useCallback } from "react";
import { getBookmarks } from "../api/getBookmarks";
import { useAuthContext } from "../context/AuthContext";

const useGetBookmarks = (userId) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userData } = useAuthContext();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log(userData.accessToken);
    try {
      const { data, error: fetchError } = await getBookmarks(
        userId,
        userData.accessToken
      );
      if (fetchError) throw new Error(fetchError.response.data);
      setBookmarks(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching bookmarks");
      setBookmarks([]);
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, userData.accessToken]);

  useEffect(() => {
    if (userId) fetchData();
  }, [userId, fetchData]);

  return { bookmarks, loading, error, refetchBookmarks: fetchData };
};

export default useGetBookmarks;
