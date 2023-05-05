import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

function RatingModal({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);

  const { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate("/login", { state: { from: `product/${slug}` } });
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "Leave Rating" : "Login to Leave Rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for Your Reviews");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>

      <ToastContainer></ToastContainer>
    </>
  );
}

export default RatingModal;
