import React from "react";
import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import laptop from "../../images/Laptop_Default.jpg";
import ProductListItems from "./ProductListItems";
import TabPane from "antd/es/tabs/TabPane";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../function/rating";

function SingleProduct({ product, onStarClick, star }) {
  const { title, description, images, _id } = product;

  return (
    <>
      <div className="col-lg-7">
        {images && images.length ? (
          <Carousel autoPlay infiniteLoop>
            {images &&
              images.map((i) => <img src={i.url} key={i.public_id} alt="" />)}
          </Carousel>
        ) : (
          <Card
            className="d-flex justify-content-center mb-3"
            cover={
              <img
                src={laptop}
                className="m-3"
                style={{ width: "50%" }}
                alt=""
              />
            }
          ></Card>
        )}

        <Tabs>
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on 1234 567 890 to learn more about this product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-lg-5">
        <h5
          className="p-2 px-4 rounded"
          style={{ backgroundColor: "#f9fbff", color: "#3b7693" }}
        >
          {title}
        </h5>

        <div className="w-100 p-2">
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div
              className="mb-3 d-flex flex-direction-column justify-content-center align-items-end align-content-center"
              style={{ fontSize: ".8rem" }}
            >
              No Rating Yet.
            </div>
          )}
        </div>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <Link to={"/"} className="text-decoration-none">
              <HeartOutlined className="text-danger" /> <br />
              Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
