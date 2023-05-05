import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../function/category";
import { LoadingOutlined } from "@ant-design/icons";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col-2 btn btn-outline-primary btn-sm fst-italic p-2 m-3 categoryBtn"
      >
        <Link className="text-decoration-none" to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <>
      <div className="container mb-3">
        <div className="row">
          {loading ? <LoadingOutlined /> : showCategories()}
        </div>
      </div>
    </>
  );
}

export default CategoryList;
