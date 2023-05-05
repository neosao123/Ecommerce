import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../function/product";
import { useDispatch, useSelector } from "react-redux";
import ProductsCard from "../components/cards/ProductsCard";
import { LoadingOutlined } from "@ant-design/icons";

function Shop() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  let search = useSelector((state) => ({ ...state }));
  console.log("search", search)

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="jumbotron m-2 p-2">
        <div className="row w-100">
          <div className="col-md-3 my-2">
            <p className="text-left">Search / Filter Menu</p>
          </div>
          <div className="col-md-9 my-2">
            {loading ? (
              <div className="d-flex justify-content-start my-4">
                <LoadingOutlined />
              </div>
            ) : (
              <div className="d-flex justify-content-start">
                <h5 className="my-3 text-dark">Products</h5>
              </div>
            )}

            {product.length < 1 && (
              <div className="d-flex justify-content-start">
                <p>No Product Found</p>
              </div>
            )}
            <div className="row">
              {product.map((p) => {
                return (
                  <div key={p._id} className="col-md-4 mb-3">
                    <ProductsCard products={p} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;

// {product && product.length > 0 ? <div></div> : <div></div>}
