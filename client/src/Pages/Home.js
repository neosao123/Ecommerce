import React, { useEffect, useState } from "react";
import { getProducts, getProductsByCount } from "../function/product";
import { LoadingOutlined } from "@ant-design/icons";
import ProductsCard from "../components/cards/ProductsCard";
import Jumbotron from "../components/cards/Jumbotron";
import { Skeleton } from "antd";
import LoadingCard from "../components/cards/LoadingCard";
import NewArrival from "../components/home/NewArrival";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import Search from "../components/forms/Search";

const Home = () => {
  return (
    <>
      <div
        className="jumbotron p-4 mb-4 text-dark fs-5 text-center fw-bolder"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <Jumbotron text={["Latest Product", "Best Sellers", "New Arrival"]} />
      </div>

      <div
        className="jumbotron p-4 mb-4 text-dark fs-5 text-center fw-bolder"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        New Arrival
      </div>

      <NewArrival />

      <br />
      <br />

      <div
        className="jumbotron p-4 mb-4 text-dark fs-5 text-center fw-bolder"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        Best Sellers
      </div>
      <BestSellers />
      <br />
      <br />

      <div
        className="jumbotron p-4 mb-4 text-dark fs-5 text-center fw-bolder"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        Category List
      </div>
      <CategoryList />
      <br />
      <br />
      <div
        className="jumbotron p-4 mb-4 text-dark fs-5 text-center fw-bolder"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        Sub Category List
      </div>
      <SubList />
    </>
  );
};

export default Home;
