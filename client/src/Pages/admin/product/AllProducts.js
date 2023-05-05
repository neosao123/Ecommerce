import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../function/product";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    await getProductsByCount(100)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("GET PRODUCTS BY COUNT ERR: ", err);
      });
  };

  const handleRemove = async (slug) => {
    setLoading(true);

    let answer = window.confirm("Delete ?");
    if (answer) {
      await removeProduct(slug, user?.token)
        .then((res) => {
          setLoading(false);
          loadAllProducts();
          toast.error(`${res.data.data.title} is deleted`);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            {loading ? (
              <LoadingOutlined className="text-primary" />
            ) : (
              <>
                <div className="d-flex justify-content-between">
                  <h5 className="my-3 text-dark">All Products</h5>
                  <Link to="/admin/product">
                    <button className="btn btn-primary btn-sm px-2 py-1 my-3">
                      Create New Product
                    </button>
                  </Link>
                </div>

                <div className="row gx-3">
                  {products.map((product) => (
                    <div key={product._id} className="col-lg-3 mb-3">
                      <AdminProductCard
                        product={product}
                        handleRemove={handleRemove}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AllProducts;
