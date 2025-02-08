import  { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";

import ProductType from "../../../types/product";
import ProductsSlider from "../../../widgets/ProductsSlider/ui/ProductsSlider";
import useBasket from "../../../widgets/Basket/model/basketModel";
import SingleItemSlider from "../../../entities/SingleItemSlider/SingleItemSlider";
import ProductSlideCard from "../../../entities/ProductSlideCard/ProductSlideCard";

import Skeleton from '@mui/material/Skeleton';

import './Product.css'



const Product = () => {
    const products: ProductType[] = useSelector((state: any) => {
        return state.products.products.slice(0, 8)
    })
    const itemId: number = +useLocation().pathname.split('/')[2]
    const currentProductId =  useSelector((state: any) => state.products.currentProductId) || itemId
    const productId = itemId || currentProductId
    const [product, setProduct] = useState<ProductType>();
    const {addToBasket} = useBasket();

    console.log(products)

    const httpImageList = product?.images.map(image => (
        `http://192.168.1.3:5000/${image}`
    ))
    httpImageList?.unshift(`http://192.168.1.3:5000/${product?.img}`);


    useEffect(() => {
        document.body.style.overflow = 'auto';
        window.scrollTo({ top: 0, behavior: "smooth" });

        fetch(`http://192.168.1.3:5000/products/${productId}`, {
            method: 'GET'
          })
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error:', error));
    }, [productId])

    const recommendationCards = products.map(product => (
        <ProductSlideCard id={product.id} img={product.img} title={product.name} price={product.price}/>   
    ))

    
    return (
        <div className="product_page">
                <div className="product">
                    <SingleItemSlider product={product}/>
                    <div className="product_info">
                        <div className="product_info_title">
                            {product ? product.name : <Skeleton variant="text" sx={{ width: 400, height: 60 }} />}
                            
                        </div>
                        <div className="product_info_colection">
                            {product ? product.collection : <Skeleton variant="text" sx={{ width: 150, height: 25 }} />}
                            

                        </div>
                        <div className="product_info_price">
                            {product ? product.price + '$' : <Skeleton variant="text" sx={{ width: 200, height: 35 }} />}
                            
                        </div>
                        <div className="product_info_addition">
                            <div className="product_info_addition_paragraphs">
                                <div className="paragraphs_title">Description</div>
                                <div className="paragraphs_title">Details</div>
                                <div className="paragraphs_title">Review</div>
                            </div>
                            <p>
                                {product ? product.description : <Skeleton variant="text" sx={{ width: '100%', height: 150 }} />}
                            </p>
                        </div>
                        <div className="product_buttons">
                            <button onClick={() => product && addToBasket(productId, product.price)}>Add to card</button>
                            <button>Add to wishlist</button>
                        </div>
                    </div>
                </div>
                <div className="product_page__recommendation">
                    <ProductsSlider margin={10} baseCardWidth={250}>
                        {recommendationCards}
                    </ProductsSlider>                    
                </div>
        </div>
    );
}

export default Product;