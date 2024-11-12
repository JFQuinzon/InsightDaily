import React from "react";

import { Pagination } from "flowbite-react";
import { useState } from "react";

function PaginationCompnent({ totalPages, currentPage, setCurrentPage }) {
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <Pagination
      layout="pagination"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      previousLabel=""
      nextLabel=""
      showIcons
    />
  );
}

export default PaginationCompnent;
