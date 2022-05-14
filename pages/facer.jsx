import React from "react";
import { AddFace } from "../components/AddFace";
import { SearchFace } from "../components/SearchFace";

const facer = () => {
  return (
    <div className="max-w-2xl mx-auto my-7">
      <AddFace />
      <div className="my-5"></div>
      <SearchFace />
    </div>
  );
};
export default facer;
