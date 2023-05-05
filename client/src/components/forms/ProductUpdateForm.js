import React from "react";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import ProductUpdate from "../../Pages/admin/product/ProductUpdate";

function ProductUpdateFrom({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  setValues,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div
            className="col-lg-4 form-group my-1"
            style={{ fontSize: ".8rem" }}
          >
            <label className="my-1">Title</label>
            <input
              type="text"
              name="title"
              className="form-control my-1 py-1"
              value={title}
              placeholder="Apple"
              onChange={handleChange}
              style={{ fontSize: ".8rem" }}
            ></input>
          </div>

          <div className="col-lg-8 form-group my-1">
            <label className="my-1" style={{ fontSize: ".8rem" }}>
              Description
            </label>
            <input
              type="text"
              name="description"
              className="form-control my-1 py-1"
              value={description}
              placeholder="IPad Pro"
              onChange={handleChange}
              style={{ fontSize: ".8rem" }}
            ></input>
          </div>

          <div className="col-lg-2 form-group my-1">
            <label className="my-1" style={{ fontSize: ".8rem" }}>
              Price
            </label>
            <input
              type="number"
              name="price"
              className="form-control my-1 py-1"
              value={price}
              placeholder="40,0000"
              onChange={handleChange}
              style={{ fontSize: ".8rem" }}
            ></input>
          </div>

          <div className="col-lg-2 form-group my-1">
            <label className="my-1" style={{ fontSize: ".8rem" }}>
              Qauntity
            </label>
            <input
              type="number"
              name="quantity"
              className="form-control my-1 py-1"
              value={quantity}
              placeholder="10"
              onChange={handleChange}
              style={{ fontSize: ".8rem" }}
            ></input>
          </div>

          <div className="col-lg-2 form-group my-1">
            <label className="my-1" style={{ fontSize: ".8rem" }}>
              Shipping
            </label>
            <select
              name="shipping"
              value={shipping}
              onChange={handleChange}
              className="form-control"
              style={{ fontSize: ".8rem" }}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div className="col-lg-3 form-group my-1">
            <label className="my-1" style={{ fontSize: ".8rem" }}>
              Color
            </label>
            <select
              name="color"
              value={color}
              onChange={handleChange}
              className="form-control"
              style={{ fontSize: ".8rem" }}
            >
              {colors.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-3 form-group my-1">
            <label className="my-1" style={{ fontSize: ".8rem" }}>
              Brand
            </label>
            <select
              name="brand"
              value={brand}
              onChange={handleChange}
              className="form-control"
              style={{ fontSize: ".8rem" }}
            >
              {brands.map((b) => (
                <option value={b} key={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-3 form-group my-1">
            <label className="my-1" style={{ fontSize: ".8rem" }}>
              Category
            </label>
            <select
              name="category"
              className="form-control"
              onChange={handleCategoryChange}
              style={{ fontSize: ".8rem" }}
              value={selectedCategory ? selectedCategory : category._id}
            >
              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option className="p-2 m-2" key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-lg-9 form-group my-1">
            <label className="my-1" style={{ fontSize: ".8rem" }}>
              Sub Category
            </label>
            <Select
              mode="multiple"
              placeholder="Please Select Sub Category"
              value={arrayOfSubs}
              style={{ width: "100%" }}
              onChange={(value) => setArrayOfSubs(value)}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Select.Option key={s._id} value={s._id}>
                    {s.name}
                  </Select.Option>
                ))}
            </Select>
          </div>

          <div className="col-lg-12 form-group my-2 d-flex justify-content-center">
            <button
              className="btn btn-sm btn-outline-success px-3 py-2 my-2 fw-bolder text "
              style={{ fontSize: ".8rem" }}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ProductUpdateFrom;
