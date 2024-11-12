import React from "react";
import placeholder from "../../assets/placeholder.png";
import { NavLink } from "react-router-dom";
import { timeAgo } from "../../utils/time";

function LargeCard({ article, onOpenModal }) {
  return (
    <div className="group">
      <NavLink to={article.url}>
        <img
          src={article.urlToImage ? article.urlToImage : placeholder}
          alt={article.title}
          className="w-auto object-cover transition-transform duration-300 group-hover:opacity-50"
        />
        <h5 className="text-3xl font-bold text-black transition-all duration-300 group-hover:underline">
          {article.title}
        </h5>
        <p className="text-gray-900 pt-3 text-lg">
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
          className="text-gray-500 hover:text-black block cursor-pointer text-end font-bold pr-2 pt-2"
        >
          Add to Bookmark
        </a>
      </div>
    </div>
  );
}

export default LargeCard;
