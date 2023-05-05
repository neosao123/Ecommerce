import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Search() {
  let dispatch = useDispatch();

  let { search } = useSelector((state) => ({ ...state }));
  console.log("user value-----> ", search);

  const navigate = useNavigate();

  const handleChange = (e) => {
    //
  };

  // const { text } = search;

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate(`/shop`);
    dispatch({
      type: "SEARCH",
      payload: { text: e.target.value },
    });
  };
  return (
    <>
      <form
        className="form-group form-inline d-flex flex-direction-column justify-content-start p-2 px-3 align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChange}
          type="search"
          placeholder="Search"
          className="w-50 form-control"
        />
        <SearchOutlined className="px-3" onClick={handleSubmit} />
      </form>
    </>
  );
}

export default Search;
