import React from "react";

function LocalSearch({ keyword, setKeyword }) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <input
            type="search"
            placeholder="Search"
            value={keyword}
            className="form-control my-2"
            onChange={handleSearchChange}
            style={{fontSize: ".8rem"}}
          />
        </div>
      </div>
    </>
  );
}

export default LocalSearch;
