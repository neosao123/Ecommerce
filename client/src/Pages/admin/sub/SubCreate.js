import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getCategories } from "../../../function/category";
import { createSub, removeSub, getSubs } from "../../../function/sub";
import { Link } from "react-router-dom";
import LocalSearch from "../../../components/forms/LocalSearch";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);

  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const loadSubs = () =>
    getSubs().then((s) => {
      setSubs(s.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        console.log(res.data.name);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted.`);
          loadSubs();
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
              <h5 className="mb-3">Create Sub Category</h5>
            )}
            <hr className="text-dark" style={{ height: ".1rem" }} />
            <div className="form-group">
              <label className="text-secondary py-3" style={{ fontSize: ".8rem" }}>
                Category
              </label>
              <select
                name="category"
                className="mx-3 px-1 mb-2 p-1 "
                onChange={(e) => setCategory(e.target.value)}
                style={{ fontSize: ".8rem" }}
              >
                <option>Please Select Category</option>
                {categories.length > 0 &&
                  categories.map((c) => {
                    return (
                      <option className="p-2 m-2" value={c._id} key={c._id}>
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
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <hr className="text-danger" />
            <div className="d-flex justify-content-end mx-3">
              <div className="rounded-pill bg-primary px-3 py-1 text-white c-count" style={{ fontSize: ".8rem" }}>
                {subs.length}
              </div>
            </div>
            <hr className="text-secondary" />
            <div className="row gx-3">
              {subs.filter(searched(keyword)).map((s) => (
                <div className="col-4" style={{ fontSize: ".85rem" }}>
                  <div key={s._id} className="alert alert-secondary my-3">
                    {s.name}

                    <span
                      onClick={() => handleRemove(s.slug)}
                      className="btn btn-sm action-btn p-2"
                    >
                      <DeleteOutlined className="text-danger" />
                    </span>

                    <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
