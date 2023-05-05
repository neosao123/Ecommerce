import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import "./CategoryCreate.css";
import { useSelector } from "react-redux";
import { getCategories } from "../../../function/category";
import { createSub, removeSub, getSub, updateSub } from "../../../function/sub";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LocalSearch from "../../../components/forms/LocalSearch";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sub, setSub] = useState([]);
  const [category, setCategory] = useState("");
  const [parent, setParent] = useState();

  let navigate = useNavigate();
  let { slug } = useParams();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const loadSub = () =>
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateSub(slug, { name, parent }, user.token).then((res) => {
      console.log(res.data.name);
      toast.success(`${res.data.name} is Updated`);
      setLoading(true);
      setName("");
    });
    navigate("/admin/sub").catch((err) => {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
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
              <h4 className="mb-3 text-danger">Loading....</h4>
            ) : (
              <h5 className="mb-3">Update Sub Category</h5>
            )}
            <hr className="text-dark" style={{ height: ".1rem" }} />
            <div className="form-group">
              <label className="text-secondary py-3">Category</label>
              <select
                name="category"
                className="mx-3 px-1 mb-2 p-1 "
                onChange={(e) => setParent(e.target.value)}
              >
                <option>Please Select Category</option>
                {categories.length > 0 &&
                  categories.map((c) => {
                    return (
                      <option
                        className="p-2 m-2"
                        value={c._id}
                        key={c._id}
                        selected={c._id === parent}
                      >
                        {c.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SubUpdate;
