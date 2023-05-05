import React, { useEffect, useState } from "react";
import {
  getProducts,
  getProductsByCount,
  getproductCount,
} from "../../function/product";

import { ConsoleSqlOutlined, LoadingOutlined } from "@ant-design/icons";
import ProductsCard from "../cards/ProductsCard";
import Jumbotron from "../cards/Jumbotron";
import { Pagination } from "antd";
import LoadingCard from "../cards/LoadingCard";
import { showAverage } from "../../function/rating";

const NewArrival = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productCount, setProductsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // console.log("Page ----->", page);
  // console.log("total count---------", productCount)

  useEffect(() => {
    loadAllProducts();
  }, [currentPage]);

  useEffect(() => {
    getproductCount().then((res) => {
      console.log("Page Count-------->", res.data);
      setProductsCount(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    console.log(currentPage);
    setLoading(true);
    let data = { sort: "createAt", order: "desc", page: currentPage };
    console.log(data);
    getProducts(data)
      .then((res) => {
        console.log("RES FROM NEW ARRIVAL ---->", res);
        console.log("RES DATA FROM NEW ARRIVAL ---->", res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("GET PRODUCT BY COUNT ERR ----> ", err);
      });
  };

  function handlePageChange(value) {
    setCurrentPage(value);
  }

  return (
    <>
      
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products?.map((p) => (
              <div key={p?._id} className="col-lg-4 mb-5">
                <ProductsCard products={p} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <div className="col text-center p-3">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={productCount * 3}
          />
        </div>
      </div>
    </>
  );
};

export default NewArrival;
