import { useState } from "react";
import { createBookmark } from "../api/createBookmark";
import { useAuthContext } from "../context/AuthContext";

export const useCreateBookmark = (onCloseModal) => {
  const { userData } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateBookmark = async (article, note) => {
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
      const { data, errors } = await createBookmark(
        formData,
        userData.accessToken
      );

      if (data) {
        console.log("Bookmark added successfully!", data);
        onCloseModal(); // Close the modal after successful submission
      } else {
        console.error("Failed to add bookmark:", errors);
        setError(errors);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateBookmark, loading, error };
};
