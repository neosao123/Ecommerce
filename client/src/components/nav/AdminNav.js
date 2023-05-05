import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div>
      <nav className="">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/admin/dashboard" className="nav-link">
              Dashoboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/products" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/category" className="nav-link">
              Category
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/sub" className="nav-link">
              Sub Category
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/coupon" className="nav-link">
              Coupon
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
