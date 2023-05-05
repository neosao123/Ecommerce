import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CategoryCreate.css";
import { useSelector } from "react-redux";
import { updateCategory, getCategory } from "../../../function/category";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let { slug } = useParams();
  useEffect(() => {
    loadingCategory();
  }, []);

  const loadingCategory = () =>
    getCategory(slug).then((c) => {
      setName(c.data.name);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit");
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        console.log("name of res", res.data.name);
        setLoading(false);
        toast.success(`${res.data.name} is Updated`);
      })
      navigate("/admin/category")
      .catch((err) => {
        console.log("Error ", err);
        setLoading(false);
      });
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
              <h5 className="mb-3 text-danger">Loading....</h5>
            ) : (
              <h5 className="mb-3">Update Category</h5>
            )}
            <hr className="text-dark" style={{height: ".1rem"}}/>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <hr className="text-danger" />
            <div className="d-flex justify-content-end mx-3"></div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CategoryUpdate;
