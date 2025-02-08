import React, { ReactNode, Children, cloneElement } from 'react';

import { useProductsSlider } from '../model/useProductsSlider';

import './ProductsSlider.css'


type  ProductsSliderPropsType = {
    margin?: number
    children?: ReactNode
    baseCardWidth?: number
}


const ProductsSlider = ({children, margin = 0, baseCardWidth = 325}: ProductsSliderPropsType) => {
    const {
        sliderRef,
        firstCardRef,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleMouseStart,
        handleMouseMove,
        handleEnd
    } = useProductsSlider(baseCardWidth, margin)


    const childrenArray = Children.toArray(children) as React.ReactElement[];

    const modifiedChildren = childrenArray.map((child, index) =>
        index === 0 && React.isValidElement(child)
            ? cloneElement(child, { ref: firstCardRef } as any)
            : child
    );


    return (
        <div className="slider-list">
            <div 
                ref={sliderRef}
                style={{scrollBehavior: isDragging ? 'auto' : 'smooth'}}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleEnd}
                onMouseDown={handleMouseStart}
                onMouseMove={handleMouseMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                className="slider-list__wrapper"
            >
                {modifiedChildren}
            </div>
        </div>   
    )
}

export default ProductsSlider;