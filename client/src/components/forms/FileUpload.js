import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import axios, { all } from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import Search from "./Search";


function FileUpload({ values, setValues, setLoading }) {
  const user = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    if (values.images.length <= 4) {
      console.log("Target Value -----> ", e.target.files);
      // resize

      let files = e.target.files;
      let allUploadedFiles = values.images;

      if (files) {
        console.log("checked");
        for (let i = 0; i < files.length; i++) {
          Resizer.imageFileResizer(
            files[i],
            720,
            720,
            "JPEG",
            100,
            0,
            (uri) => {
              axios
                .post(
                  "http://127.0.0.1:2001/uploadimage",
                  { image: uri },
                  {
                    headers: {
                      token: user.user ? user.user.token : "",
                    },
                  }
                )
                .then((res) => {
                  setLoading(false);
                  // console.log(res.data.length);
                  allUploadedFiles.push(res.data);
                  setValues({ ...values, images: allUploadedFiles });
                })
                .catch((err) => {
                  setLoading(false);
                });
            },
            "base64"
          );
        }
      }
      // sent back to the server to upload to cloudinary
      // set url to image[] to parent component productcreate

      // window.alert("You Can able top Upload More than 5 Images");
    } else {
      console.log("not allowed....");
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    console.log("Remove Image", public_id);

    axios
      .post(
        "http://127.0.0.1:2001/removeimage",
        { public_id },
        {
          headers: {
            token: user.user ? user.user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);

        const { images } = values;
        console.log(images);
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
        console.log("Image has been Removed...");
      })
      .catch((err) => {
        setLoading(false);
        console.log("ERROR FROM REMOVE IMAGES : ", err);
      });
  };
  let img = values.images;
  return (
    <>
      <div className="my-3">
        {img &&
          img.map((image) => (
            <Badge
              className="mx-2"
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={60}
                shape="square"
                style={{ border: "2px solid #e5e5e5" }}
                className="p-1"
              />
            </Badge>
          ))}
      </div>
      <div className="mb-3">
        <label
          className="my-1 mx-2 btn btn-outline-primary"
          style={{ fontSize: ".8rem" }}
        >
          Upload
          <input
            className="form-control form-control-sm"
            style={{ fontSize: ".8rem" }}
            id="formFileSm"
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
}

export default FileUpload;
