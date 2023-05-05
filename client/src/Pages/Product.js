import React, { useEffect, useState } from "react";
import { getProduct, getRelated, productStar } from "../function/product";
import { json, useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductsCard from "../components/cards/ProductsCard";

function Product() {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  let { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
    onStarClick();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      //get related
      getRelated(res.data._id).then((res) => {
        setRelated(res.data);
      });
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.log("New Ratings ----------> ", newRating);
    productStar(name, newRating, user.token)
      .then((res) => {
        console.log("rating clicked", res.data);
        loadSingleProduct();
      })
      .catch((err) => {
        console.log("rating fn error ===> ", err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row pt-4">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
        </div>
        <div className="row py-4">
          <div
            className="py-2 text-center"
            style={{ backgroundColor: "#f9fbff", color: "#3b7693" }}
          >
            <h5>Related Products</h5>
          </div>
          <div className="row pb-5">
            {related.length
              ? related.map((data) => (
                  <div className="col-lg-4">
                    <ProductsCard products={data} />
                  </div>
                ))
              : "No Product Found"}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
