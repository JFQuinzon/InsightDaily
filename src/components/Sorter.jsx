import { Dropdown } from "flowbite-react";
import React from "react";

function Sorter({ handleSort }) {
  return (
    <div className="w-32">
      <Dropdown label="Sort by" color="white" dismissOnClick={true}>
        <Dropdown.Item onClick={() => handleSort("publishedAt")}>
          Latest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort("relevancy")}>
          Relevance
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort("popularity")}>
          Popular
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

export default Sorter;
