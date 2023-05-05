import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductsCard from "../../components/cards/ProductsCard";
import CategoryList from "../../components/category/CategoryList";
import { getCategory } from "../../function/category";
import { LoadingOutlined } from "@ant-design/icons";

function CategoryHome() {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProduct(res.data.product);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {loading ? (
              <div className="text-center p-3">
                <LoadingOutlined />
              </div>
            ) : (
              <h5
                className="text-center mt-3 my-1 p-3 jumbotron rounded"
                style={{ backgroundColor: "#107393", color: "#f1f1f1" }}
              >
                {product.length} Products in "{category.name}" Category
              </h5>
            )}
          </div>
        </div>
        <div className="row">
          {product.map((p) => {
            return (
              <div className="col-4">
                {loading ? (
                  <div className="text-center mb-3 p-3">
                    <LoadingOutlined />
                  </div>
                ) : (
                  <div className="mb-3 p-3" key={p._id}>
                    <ProductsCard products={p} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CategoryHome;
