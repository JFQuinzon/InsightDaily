import React from "react";
import { NavLink } from "react-router-dom";

function TextCard({ article, onOpenModal }) {
  return (
    <div>
      <div className="lg:border-b-2 border-b-slate-500 group">
        <NavLink to={article.url}>
          <div>
            <h5 className="text-xl font-semibold text-black transition-all duration-300 group-hover:underline">
              {article.title}
            </h5>
          </div>
          <p className="leading-5 text-gray-900 pt-2 ">
            {article.description
              ? article.description
              : "Click here to read the full article and get more details about this topic."}
          </p>
        </NavLink>
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

export default TextCard;
