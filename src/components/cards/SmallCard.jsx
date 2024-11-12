import React from "react";
import { NavLink } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import { timeAgo } from "../../utils/time";

function SmallCard({ article, onOpenModal }) {
  return (
    <div className="group">
      <NavLink to={article.url}>
        <img
          src={article.urlToImage ? article.urlToImage : placeholder}
          alt={article.title}
          className="w-auto object-cover transition-transform duration-300 group-hover:opacity-50"
        />
        <h5 className="leading-6 text-lg font-semibold text-black transition-all duration-300 group-hover:underline">
          {article.title}
        </h5>
        <p className="leading-5 text-gray-900 pt-2">
          {article.description
            ? article.description
            : "Click here to read the full article and get more details about this topic."}
        </p>
      </NavLink>
      <div className="lg:border-b-2 border-b-slate-500 pb-2 ">
        <p className="text-gray-500 pt-4">
          {timeAgo(article.publishedAt)} {article.author && "|"}{" "}
          {article.author}
        </p>
        <a
          onClick={() => onOpenModal(article)}
          onOpenModal={onOpenModal}
          className="text-gray-500 hover:text-black block cursor-pointer text-end font-bold pr-2 pt-2"
        >
          Add to Bookmark
        </a>
      </div>
    </div>
  );
}

export default SmallCard;
