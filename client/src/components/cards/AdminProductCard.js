import { Card } from "antd";
import React from "react";
import laptop from "../../images/Laptop_Default.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

function AdminProductCard({ product, key, handleRemove }) {
  const { title, description, images, slug } = product;
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
          />
        }
        style={{
          height: "100%",
          backgroundColor: "#fefefe",
          fontSize: ".8rem",
          border: ".5px solid #dddddd",
        }}
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined className="text-warning" />
          </Link>,
          <DeleteOutlined
            className="text-danger"
            onClick={() => handleRemove(slug)}
          />,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 50)}...`}
        ></Meta>
      </Card>
    </>
  );
}

export default AdminProductCard;
