import React from "react";
import { Link } from "react-router-dom";

function ProductListItems({ product }) {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;

  
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item" style={{ border: "none" }}>
          <div className="d-flex justify-content-between">
            <span>Price</span>
            <span>${price}</span>
          </div>
        </li>
        {category && (
          <li className="list-group-item" style={{ border: "none" }}>
            <div className="d-flex justify-content-between">
              <span>Category</span>
              <Link
                to={`/category/${category.slug}`}
                className="text-decoration-none"
              >
                <span>{category.name}</span>
              </Link>
            </div>
          </li>
        )}
        {subs && (
          <li className="list-group-item" style={{ border: "none" }}>
            <div className="d-flex justify-content-between">
              <span>Sub Category</span>
              {subs?.map((s) => {
                return (
                  <Link
                    key={s._id}
                    to={`/sub/${s.slug}`}
                    className="text-decoration-none"
                  >
                    {s.name}
                  </Link>
                );
              })}
            </div>
          </li>
        )}
        <li className="list-group-item" style={{ border: "none" }}>
          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>{shipping}</span>
          </div>
        </li>
        <li className="list-group-item" style={{ border: "none" }}>
          <div className="d-flex justify-content-between">
            <span>Color</span>
            <span>{color}</span>
          </div>
        </li>
        <li className="list-group-item" style={{ border: "none" }}>
          <div className="d-flex justify-content-between">
            <span>Brand</span>
            <span>{brand}</span>
          </div>
        </li>
        <li className="list-group-item" style={{ border: "none" }}>
          <div className="d-flex justify-content-between">
            <span>Available</span>
            <span>{quantity}</span>
          </div>
        </li>
        <li className="list-group-item" style={{ border: "none" }}>
          <div className="d-flex justify-content-between">
            <span>sold</span>
            <span>{sold}</span>
          </div>
        </li>
      </ul>
    </>
  );
}

export default ProductListItems;
