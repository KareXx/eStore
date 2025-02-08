
import { Link } from "react-router";

import useBasket from "../../../widgets/Basket/model/basketModel";

import './ProductCardCatalog.css'

type ProductCardCatalogProps = {
    product: {
        id: number,
        name: string,
        price: number,
        img: string,
    },
    onClick?: () => void
}

const ProductCardCatalog = ({product, onClick}: ProductCardCatalogProps) => {
    const {addToBasket} = useBasket();
    const productLink = '/product/' + product.id;


    return (
            <div className="card__catalog" onClick={onClick}>
                    <Link to={productLink} style={{flex: '1'}}>
                        <div className="card__catalog__img">
                            <img src={product.img.indexOf('http') === 0 ? product.img: `http://192.168.1.3:5000/${product.img}`}/>
                        </div>
                    </Link>

                    <div className="card__catalog__information">
                        <Link to={productLink}>
                            <div className="card__catalog__title">{product.name.length < 20 ?product.name: product.name.slice(0, 20) + '...'}</div>
                        </Link>

                        <div className="card__catalog__price">{product.price}₴</div>
                    </div>

                <div className="card__catalog__buttons">
                    <button onClick={() => addToBasket(product.id, product.price)}>BUY</button>
                </div>
            </div>
        
    );
}

export default ProductCardCatalog;