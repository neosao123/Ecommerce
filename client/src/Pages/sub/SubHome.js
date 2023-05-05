import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsCard from "../../components/cards/ProductsCard";
import { LoadingOutlined } from "@ant-design/icons";
import { getSub } from "../../function/sub";

function SubHome() {
  const { slug } = useParams();
  const [sub, setSub] = useState({});
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.subs);
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
                {product.length} Products in "{sub.name}" Sub Category
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

export default SubHome;
