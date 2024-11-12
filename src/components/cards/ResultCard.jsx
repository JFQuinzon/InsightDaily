import React from "react";
import { NavLink } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import { timeAgo } from "../../utils/time";

function ResultCard({ article, onOpenModal }) {
  return (
    <div>
      <div className="flex justify-between items-center border-b-2 border-b-slate-500 pb-2 group mb-2">
        <div className="relative w-2/3 h-32 md:h-44 lg:h-52">
          <NavLink to={article.url}>
            <h5 className="leading-6 text-base lg:text-2xl font-bold text-black transition-all duration-300 group-hover:underline">
              {article.title}
            </h5>
            <p className="hidden md:block leading-5 text-base text-gray-900 pt-2 lg:text-lg">
              {article.description
                ? article.description
                : "Click here to read the full article and get more details about this topic."}
            </p>
          </NavLink>
          <div className="absolute start bottom-1.5 flex justify-between w-full">
            <p className=" text-sm lg:text-base text-gray-500 pt-2">
              {timeAgo(article.publishedAt)} {article.author && "|"}{" "}
              {article.author}
            </p>
            <a
              onClick={() => onOpenModal(article)}
              onOpenModal={onOpenModal}
              className="block text-gray-500 hover:text-black  cursor-pointer text-end font-bold pr-2 pt-2"
            >
              Add to Bookmark
            </a>
          </div>
        </div>
        <NavLink to={article.url}>
          <img
            src={article.urlToImage ? article.urlToImage : placeholder}
            alt={article.title}
            className="w-44 h-32 md:w-64 md:h-44 lg:w-80 lg:h-52 pl-2 transition-transform duration-300 group-hover:opacity-85"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default ResultCard;
