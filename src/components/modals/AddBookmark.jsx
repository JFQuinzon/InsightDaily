import { Button, Label, Modal, Textarea } from "flowbite-react";
import { useState } from "react";
import placeholder from "../../assets/placeholder.png";
import { useCreateBookmark } from "../../hooks/useCreateBookmark";

export function AddBookmark({ openAddModal, onCloseModal, setNote, note, article }) {
  const { handleCreateBookmark, loading, error } = useCreateBookmark(onCloseModal);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateBookmark(article, note);
  };

  return (
    <>
      <Modal show={openAddModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add to Bookmarks
            </h3>
            <img
              src={article?.urlToImage ? article.urlToImage : placeholder}
              alt={article?.title}
            />
            <h1 className="text-center px-2 text-2xl font-bold">
              {article?.title}
            </h1>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="note" value="Add note" />
                </div>
                <Textarea
                  id="note"
                  name="note"
                  placeholder="This article is about..."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error.message}</p>}
              <div className="w-full pt-2">
                <Button type="submit" color="dark" className="mx-auto" disabled={loading}>
                  {loading ? "Adding..." : "Add News"}
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
