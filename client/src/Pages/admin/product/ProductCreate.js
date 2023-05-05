import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../function/product";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategroySubs } from "../../../function/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Hewlett-Packard", "Dell", "Lenovo"],
  color: "",
  brand: "",
};

function ProductCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [subOption, setSubOption] = useState("");
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => {
      console.log(c.data);
      setValues({ ...values, categories: c.data });
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title} is Created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("ON CATEGORY CHANGE : ", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategroySubs(e.target.value).then((res) => {
      console.log("SUB OPTION CATEGORY CLICK: ", res.data);
      setSubOption(res.data);
    });
    setShowSub(true);
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
              <h5>Product Page</h5>
            )}
            <hr className="text-dark" style={{ height: ".1rem" }} />
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
            <ProductCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
              handleCategoryChange={handleCategoryChange}
              subOption={subOption}
              showSub={showSub}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ProductCreate;
