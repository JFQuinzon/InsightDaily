import React, { useEffect, useState } from "react";
import Bookmark from "../components/cards/Bookmark";
import useGetBookmarks from "../hooks/useGetBookmarks";
import { useAuthContext } from "../context/AuthContext";
import PreLoader from "../components/PreLoader";
import { UpdateBookmark } from "../components/modals/UpdateBookmark";

function Bookmarks() {
  const { validateToken } = useAuthContext();

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const { userData } = useAuthContext();
  const { bookmarks, loading, error, refetchBookmarks } = useGetBookmarks(
    userData.id
  );
  console.log(bookmarks);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [article, setArticle] = useState(null);

  function onCloseModal() {
    setOpenUpdateModal(false);
    setArticle(null);
  }

  function onOpenModal(data) {
    setOpenUpdateModal(true);
    setArticle(data);
  }

  return (
    <div className="pt-28   w-full">
      <UpdateBookmark
        openUpdateModal={openUpdateModal}
        onCloseModal={onCloseModal}
        article={article}
        refetchBookmarks={refetchBookmarks}
      />
      <div className="mx-auto lg:max-w-screen-xl px-4">
        <h1 className="text-3xl text-center pb-8">Bookmarks</h1>
        {loading ? (
          <PreLoader />
        ) : (
          bookmarks.map((article) => (
            <Bookmark
              key={article.id}
              article={article}
              onOpenModal={onOpenModal}
              refetchBookmarks={refetchBookmarks}
            />
          ))
        )}

        {error && (
          <h1 className="text-2xl text-center pb-8 text-red-700">{error}</h1>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
