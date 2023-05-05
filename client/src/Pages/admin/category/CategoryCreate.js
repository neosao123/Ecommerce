import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./CategoryCreate.css";
import CategoryForm from "../../../components/forms/CategoryForm";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../function/category";
import { Link } from "react-router-dom";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        console.log(res.data.name);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete ?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted.`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
              <h5 className="mb-3">Create Category</h5>
            )}
            <hr className="text-dark" style={{ height: ".1rem" }} />
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            {/* <hr className="text-danger" /> */}
            <div className="d-flex justify-content-end mx-3">
              <div className="rounded-pill bg-primary mt-2 px-3 py-1 text-white c-count" style={{ fontSize: ".8rem" }}>
                {categories.length}
              </div>
            </div>
            <hr className="text-secondary" style={{ height: ".2rem" }} />
            <div className="row gx-3">
              {categories.filter(searched(keyword)).map((c) => (
                <div className="col-4" style={{ fontSize: ".9rem" }}>
                  <div key={c._id} className="alert alert-secondary">
                    {c.name}

                    <span
                      onClick={() => handleRemove(c.slug)}
                      className="btn btn-sm action-btn p-2"
                    >
                      <DeleteOutlined className="text-danger" />
                    </span>

                    <Link to={`/admin/category/${c.slug}`}>
                      <span className="btn btn-sm action-btn p-2">
                        <EditOutlined className="text-warning" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CategoryCreate;
