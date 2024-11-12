import { useState } from "react";
import { deleteBookmark } from "../api/deleteBookmark";
import { useAuthContext } from "../context/AuthContext";

export const useDeleteBookmark = () => {
  const { userData } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteBookmark = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const { data, errors } = await deleteBookmark(id, userData.accessToken);

      if (!data) {
        setError(errors);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteBookmark, loading, error };
};
