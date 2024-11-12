import React from "react";
import { NavLink } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import { timeAgo } from "../../utils/time";
import { useDeleteBookmark } from "../../hooks/useDeleteBookmark";

function Bookmark({ article, refetchBookmarks, onOpenModal }) {
  const { handleDeleteBookmark, loading, error } = useDeleteBookmark();

  const handleDelete = async (id) => {
    await handleDeleteBookmark(id);
    refetchBookmarks();
  };

  return (
    <div>
      <div className="flex items-center border-b-2 border-b-slate-500 pb-2 mb-2">
        <img
          src={article.urlToImage ? article.urlToImage : placeholder}
          alt={article.title}
          className="w-44 h-32 md:w-64 md:h-44 lg:w-80 lg:h-52 pr-5"
        />
        <div className="relative w-full h-32 md:h-44 lg:h-52">
          <h5 className="leading-6 text-base lg:text-2xl font-bold text-black ">
            {article.title}
          </h5>
          <p className="hidden md:block leading-5 text-base text-gray-900 pt-2 lg:text-lg">
            {article.description
              ? article.description
              : "Click here to read the full article and get more details about this topic."}
          </p>

          <p className="hidden md:block leading-5 text-base text-gray-900 pt-2 lg:text-lg">
            <span className="font-bold">Notes: </span>
            {article.note}
          </p>
          <div className="absolute start bottom-1.5 flex justify-between w-full">
            <p className=" text-sm lg:text-base text-gray-500 ">
              {timeAgo(article.publishedAt)} {article.author && "|"}{" "}
              {article.author}
            </p>
            <div>
              <NavLink to={article.url} target="_blank">
                <a className=" text-sky-500 hover:text-sky-700 cursor-pointer font-bold px-2">
                  MORE INFO
                </a>
              </NavLink>
              <a
                onClick={() => onOpenModal(article)}
                className=" text-green-500 hover:text-green-700 cursor-pointer font-bold  px-2"
              >
                UPDATE
              </a>
              <a
                onClick={() => {
                  handleDelete(article.id);
                }}
                className=" text-red-500 hover:text-red-700 cursor-pointer font-bold  px-2"
              >
                DELETE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
