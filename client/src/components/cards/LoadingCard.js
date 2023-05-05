import { Skeleton } from "antd";
import Card from "antd/es/card/Card";
import React from "react";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col m-3">
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };
  return <div className="row p-3">{cards()}</div>;
};

export default LoadingCard;
