import React from "react";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import laptop from "../../images/Laptop_Default.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../function/rating";

const { Meta } = Card;

const ProductsCard = ({ products }) => {
  const { title, description, images, slug } = products;
  return (
    <>
      <Card
        hoverable
        cover={
          <img
            src={images && images.length ? images[0]?.url : laptop}
            style={{
              height: "200px",
              objectFit: "cover",
              border: ".5px solid #dddddd",
            }}
            className="p-1"
            alt="Images"
          />
        }
        style={{
          height: "100%",
          backgroundColor: "#fefefe",
          fontSize: ".8rem",
          border: ".5px solid #dddddd",
        }}
        className="mb-3"
        actions={[
          <>
            <Link to={`/product/${slug}`} className="text-decoration-none">
              <EyeOutlined className="text-warning" />
              <br />
              View Product
            </Link>
          </>,
          <>
            <ShoppingCartOutlined className="text-danger" /> Add To Cart
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 60)}...`}
        ></Meta>
        <>
          {products && products?.ratings && products?.ratings?.length > 0 ? (
            showAverage(products)
          ) : (
            <div className="mt-3" style={{ fontSize: ".8rem" }}>
              No Rating Yet.
            </div>
          )}
        </>
      </Card>
    </>
  );
};

export default ProductsCard;
