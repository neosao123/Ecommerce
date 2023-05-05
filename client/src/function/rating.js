import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    

    let highest = length * 5;
    

    let result = (totalReduced * 5) / highest;
    

    return (
      <>
        <div className="my-3 mx-0 mb-0 d-flex flex-direction-column justify-content-start align-items-end align-content-center">
          <StarRating
            rating={result}
            starRatedColor="red"
            starDimension="1rem"
          />
          <div>
            <p className="m-0 mb-0 px-2 fw-bold" style={{ fontSize: ".8rem" }}>
              ({p.ratings.length})
            </p>
          </div>
        </div>
      </>
    );
  }
};
