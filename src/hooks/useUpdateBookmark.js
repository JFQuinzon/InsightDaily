import { useState } from "react";
import { updateBookmark } from "../api/updateBookmark";
import { useAuthContext } from "../context/AuthContext";

export const useUpdateBookmark = (onCloseModal) => {
  const { userData } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateBookmark = async (id, article, note) => {
    setLoading(true);
    setError(null);

    const formData = {
      user_Id: userData.id,
      title: article?.title,
      description: article?.description,
      publishedAt: article?.publishedAt,
      author: article?.author,
      url: article?.url,
      urlToImage: article?.urlToImage,
      note: note,
    };

    try {
      const { data, errors } = await updateBookmark(
        id,
        formData,
        userData.accessToken
      );

      if (data) {
        console.log("Bookmark updated successfully!", data);
        onCloseModal(); // Close the modal after successful update
      } else {
        console.error("Failed to update bookmark:", errors);
        setError(errors);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateBookmark, loading, error };
};
