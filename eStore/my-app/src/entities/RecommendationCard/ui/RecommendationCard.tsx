

import './RecommendationCard.css';
import watchImg from '../static/watch.webp'
import React, { forwardRef } from 'react';

type RecommendationCardProps = {
    img: string
    id: number,
    price: number,
    name: string,
    ref?: React.RefObject<HTMLDivElement> | undefined
    style?: React.CSSProperties;
}

const RecommendationCard = forwardRef<HTMLDivElement, RecommendationCardProps>(
    ({ img, id, price, name, style }, ref) => {
        const imageSrc = `http://192.168.1.3:5000/${img}`;
        return (
            <div className="card" ref={ref} style={style}>
                <div className="image">
                    <img draggable="false" src={imageSrc} />
                </div>
                <div className="information">
                    <div className="title">{name}</div>
                    <div className="price">{price}₴</div>
                </div>
                <div className="buttons">
                    <div className="more">more</div>
                    <div className="buy">buy</div>
                </div>
            </div>
        );
    }
);

export default RecommendationCard;
