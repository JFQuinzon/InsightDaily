import React, { useEffect, useState } from "react";
import SmallCard from "./cards/SmallCard";
import LargeCard from "./cards/LargeCard";
import TextCard from "./cards/TextCard";
import Sorter from "./Sorter";
import SearchBar from "./SearchBar";
import ResultCard from "./cards/ResultCard";
import PreLoader from "./PreLoader";
import PaginationCompnent from "./Pagination";
import { AddBookmark } from "./modals/AddBookmark";

function News({ category, country, search, sort, handleSearch, handleSort }) {
  const APIKEY = "a6aa6fdc4eaf472a87179cb3db242088";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    let url;
    if (search) {
      url = `https://newsapi.org/v2/everything?q=${search}&sortBy=${sort}&apiKey=${APIKEY}`;
    } else {
      if (category === "global") {
        setCurrentPage(1);
        url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=100&apiKey=${APIKEY}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=100&apiKey=${APIKEY}`;
      }
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredArticles = data.articles.filter(
          (article) => article.title !== "[Removed]"
        );
        setArticles(filteredArticles);
        setTotalPages(Math.ceil((filteredArticles.length - 7) / perPage));
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [category, country, search, sort]);

  const mainArticle = articles[0];
  const subArticles = articles.slice(1, 3);
  const textArticles = articles.slice(3, 7);

  let otherArticles;
  if (search) {
    otherArticles = articles;
  } else {
    otherArticles = articles.slice(7, 100);
  }

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedArticles = otherArticles.slice(startIndex, endIndex);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [article, setArticle] = useState(null);
  const [note, setNote] = useState("");

  function onCloseModal() {
    setOpenAddModal(false);
    setNote("");
    setArticle(null);
  }

  function onOpenModal(data) {
    setOpenAddModal(true);
    setArticle(data);
  }

  return (
    <div className="w-full">
      <AddBookmark
        openAddModal={openAddModal}
        onCloseModal={onCloseModal}
        note={note}
        setNote={setNote}
        article={article}
      />
      <div className="mx-auto lg:max-w-screen-xl px-4">
        {category === "global" && (
          <div className="flex w-full items-center pb-4">
            <Sorter handleSort={handleSort} />
            <SearchBar handleSearch={handleSearch} />
          </div>
        )}
        {loading ? (
          <PreLoader />
        ) : (
          <div>
            {!search && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4 lg:gap-4 mb-8">
                <div className="md:col-span-2 block md:hidden mb-2">
                  {mainArticle && (
                    <LargeCard
                      article={mainArticle}
                      onOpenModal={onOpenModal}
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mb-2">
                  {subArticles.map((article, index) => (
                    <SmallCard
                      key={index}
                      article={article}
                      onOpenModal={onOpenModal}
                    />
                  ))}
                </div>

                <div className="md:col-span-2 hidden md:block">
                  {mainArticle && (
                    <LargeCard
                      key={mainArticle.title}
                      article={mainArticle}
                      onOpenModal={onOpenModal}
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 md:col-span-3 lg:col-span-1 gap-4">
                  {textArticles.map((article, index) => (
                    <div>
                      <TextCard
                        key={index}
                        article={article}
                        onOpenModal={onOpenModal}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              {otherArticles.length > perPage && (
                <div className="flex justify-center md:justify-end sticky top-24 md:top-48 lg:top-36 py-2 z-50 bg-white border-b-4 border-b-black">
                  <PaginationCompnent
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )}
              {category === "global" && !search && (
                <div className="border-b-4 border-b-black pb-4 "></div>
              )}
              <div className="py-4">
                {paginatedArticles.map((article, index) => (
                  <ResultCard
                    key={index}
                    article={article}
                    onOpenModal={onOpenModal}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
