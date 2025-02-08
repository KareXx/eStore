import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import ProductType from '../../types/product'
import { setBasket } from '../../stateManager/actions';

import DeleteIcon from '@mui/icons-material/Delete';

import './BasketProductCard.css'
import BasketItemType from '../../types/basket';

type BasketProductCardPRopsType = {
    basketItem: BasketItemType
}

const BasketProductCard = ({basketItem}: BasketProductCardPRopsType) => {
    const products = useSelector((state: any) => state.products.products)
    const basket: BasketItemType[] = useSelector((state: any) => state.products.basket)
    const product = products.length > 0 ? products.filter((product:ProductType) => basketItem.id === product.id)[0]: null
    const dispatch = useDispatch();


    const handleQuantityChange = (e: React.MouseEvent, value: number) => {
        const newBasket = basket.reduce((finalBasket: BasketItemType[], item) => {
            if(basketItem.id === item.id){
                const newQuantity = item.quantity + value;
                if(newQuantity <= 0) return finalBasket
               return [...finalBasket, {id: item.id, quantity: newQuantity, price:item.price}]
            }
            return [...finalBasket, item]

        }, [])
        dispatch(setBasket(newBasket));
    };
    
    const deleteBasketItem = (e: React.MouseEvent) => {
        const newBasket = basket.filter(item => item.id !== basketItem.id);
        dispatch(setBasket(newBasket))
    }

    


    return (
        <>
            {product &&
                <div className="basket-product-card">
                <div className="basket-product-card__wrapper">
                    <Link to={`/product/${product.id}`}>
                        <div className="basket-product-card__image">
                            <img src={`http://192.168.1.3:5000/${product.img}`} alt="" />
                        </div>
                    </Link>
                    <Link to={`/product/${product.id}`}>
                        <div className="basket-product-card__name">{product.name}</div>
                    </Link>
                    <div className="basket-product-card__products-price">{product.price * basketItem.quantity}</div>
                    <div className="basket-product-card__quantity">
                        <button 
                            className='basket-product-card__quantity__botton'
                            onClick={(e) => handleQuantityChange(e, -1)}
                            >-</button>
                        <div className='basket-product-card__quantity__value'>{basketItem.quantity}</div>
                        <button 
                            className='basket-product-card__quantity__botton'
                            onClick={(e) => handleQuantityChange(e, 1)}
                        >+</button>

                    </div>
                    <div 
                        className="basket-product-card__delete"
                        onClick={deleteBasketItem}    
                    >
                        <DeleteIcon/>
                    </div>
                </div>
            </div>
            }
        </>
        
    )
}

export default BasketProductCard;