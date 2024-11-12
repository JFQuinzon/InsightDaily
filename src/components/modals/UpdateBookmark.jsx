import { Button, Label, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import placeholder from "../../assets/placeholder.png";
import { useUpdateBookmark } from "../../hooks/useUpdateBookmark";

export function UpdateBookmark({
  openUpdateModal,
  onCloseModal,
  article,
  refetchBookmarks,
}) {
  const { handleUpdateBookmark, loading, error } =
    useUpdateBookmark(onCloseModal);

  const [note, setNote] = useState("");
  useEffect(() => {
    if (article?.note) {
      setNote(article.note);
    }
  }, [article]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleUpdateBookmark(article.id, article, note);
    refetchBookmarks();
  };
  return (
    <>
      <Modal show={openUpdateModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Bookmark
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
                  <Label htmlFor="note" value="Update note" />
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
                <Button
                  type="submit"
                  color="dark"
                  className="mx-auto"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update News"}
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
