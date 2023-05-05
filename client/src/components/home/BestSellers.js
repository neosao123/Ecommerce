import React, { useEffect, useState } from "react";
import { getProducts, getproductCount } from "../../function/product";
import { LoadingOutlined } from "@ant-design/icons";
import ProductsCard from "../cards/ProductsCard";
import Jumbotron from "../cards/Jumbotron";
import { Skeleton, Pagination } from "antd";
import LoadingCard from "../cards/LoadingCard";

const BestSellers = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productCount, setProductsCount] = useState(0);
  const [page, setCurrentPage] = useState(1);
  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getproductCount().then((res) => {
      console.log("Page Count-------->", res.data);
      setProductsCount(res.data);
    });
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    let data = { sort: "sold", order: "desc", page };
    await getProducts(data)
      .then((res) => {
        console.log("Res FROM BEST SELLERS ---->", res);
        console.log("RES DATA FROM BEST SELLERS ---->", res.data);
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
            current={page}
            onChange={handlePageChange}
            total={productCount * 3}
          />
        </div>
      </div>
    </>
  );
};

export default BestSellers;
