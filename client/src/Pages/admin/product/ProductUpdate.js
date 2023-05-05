import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProduct, updateProduct } from "../../../function/product";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategroySubs } from "../../../function/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateFrom from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: [
    "Apple",
    "Samsung",
    "Microsoft",
    "Hewlett-Packard",
    "Dell",
    "Lenovo",
  ],
  color: "",
  brand: "",
};

function ProductUpdate() {
  //state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  //user
  const { user } = useSelector((state) => ({ ...state }));

  //params
  let { slug } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const loadProduct = () => {
    getProduct(slug)
      .then((p) => {
        // Load Single Product
        setValues({ ...values, ...p.data });
        // Load Single Product Sub Category
        getCategroySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data); // on first load, show default sub
        });
        // Prepare array of sub ids to show as a default sub value in antd select
        let arr = [];
        p.data.subs.map((s) => {
          arr.push(s._id);
        });
        setArrayOfSubs((prev) => arr);
      })
      .catch((err) => {
        console.log("ERR FROM PRODUCT UPDATE: ", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token).then((res) => {
      toast.success(`${res.data.title} is updated.`);
      setLoading(false);
    })
    navigate("/admin/products").catch((err) => {
      setLoading(false);
      console.log("ERROR IN PRODUCT UPDATE FUNCTION -----> ", err);
      toast.error(err.response.data.err);
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategroySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });

    // if user get back to original category
    // show its categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
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
              <h5>Edit Product</h5>
            )}

            <hr className="text-dark" style={{ height: ".1rem" }} />

            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />

            <ProductUpdateFrom
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              handleCategoryChange={handleCategoryChange}
              categories={categories}
              subOptions={subOptions}
              setArrayOfSubs={setArrayOfSubs}
              arrayOfSubs={arrayOfSubs}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ProductUpdate;
