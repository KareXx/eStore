import { Link } from "react-router-dom";
import { useState } from "react";

import "./ProductSlideCard.css";

type ProductSlideCardPropsType = {
  id: number;
  img: string;
  title: string;
  price: number;
  style?: React.CSSProperties;
};

const ProductSlideCard = ({ id, img, title, price, style }: ProductSlideCardPropsType) => {


  return (
    <div>
        <div className="product__recommendation-card">
          <div className="product__recommendation-card__wrapper">
            <div className="product__recommendation-card__img">
              <img
                draggable="false"
                src={`http://192.168.1.3:5000/${img}`}
              />
            </div>
            <div className="product__recommendation-card__info"></div>
          </div>
        </div>
    </div>
  );
};

export default ProductSlideCard;
