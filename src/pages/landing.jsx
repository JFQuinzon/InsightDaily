import React, { useContext, useEffect, useState } from "react";
import News from "../components/News";
import { useAuthContext } from "../context/AuthContext";

function Landing({
  category,
  country,
  search,
  sort,
  handleSearch,
  handleSort,
}) {
  const { validateToken } = useAuthContext();

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <>
      <div className="pt-28 md:pt-56 xl:pt-40">
        <News
          category={category}
          country={country}
          search={search}
          sort={sort}
          handleSearch={handleSearch}
          handleSort={handleSort}
        />
      </div>
    </>
  );
}

export default Landing;
