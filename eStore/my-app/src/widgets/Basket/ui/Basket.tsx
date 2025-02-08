
import { useEffect} from 'react';

import useBasket from '../model/basketModel';

import BasketProductCard from '../../../entities/BasketProductCard/BasketProductCard';
import BasketItemType from '../../../types/basket';
import ContactInformation from '../../../entities/ContactInformation/ContactInformation';
import GratitudeBasket from '../../../shared/GratitudeBasket/GratitudeBasket';

import CloseIcon from '@mui/icons-material/Close';

import './Basket.css'

type BasketPropsType = {
    isActive: boolean,
    basketActiveHandler: (e:React.MouseEvent) => void
}

const Basket = ({isActive, basketActiveHandler}: BasketPropsType) => {
    const  {basket, successfulPurchase, setSuccessfulPurchase,  showContactForm,setShowContactForm, totalPrice, buyButtonHandler} = useBasket();

    useEffect(() => {
        if(isActive){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'auto'
            setShowContactForm(false)
        }
    }, [isActive])

    useEffect(() => {
        if(successfulPurchase){
            const delay = setTimeout(() => {
                setSuccessfulPurchase(false)
            }, 3000)

            return  () => clearTimeout(delay)
        }
    }, [successfulPurchase])


    const renderBasketContent = () => {
        if(successfulPurchase){
            return (
                <GratitudeBasket/>
            );
        }

        if(!showContactForm || basket.length === 0){
            return (
                <div className="basket__layout">
                    <div className="basket__title">Basket</div>
                    <div className="basket__product-list">
                        {basket.length >0 && basket.map((basketItem: BasketItemType) => (
                            <BasketProductCard key={basketItem.id} basketItem={basketItem}/>
                        ))}
                    </div>
                    <div className="basket__details">
                        <div className="basket__details__total-price">
                            Total price: { totalPrice ? totalPrice : 0 }
                        </div>
                        <div className="basket__details__buttons">
                            <button
                                onClick={buyButtonHandler}
                            >Buy now</button>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <ContactInformation successfulPurchaseHandler={setSuccessfulPurchase}/>
            )
        }
    } 

    const classActive = isActive ? "basket basket__active" : "basket"

    return (
        <div className={classActive}>
            <div className="basket__wrapper">
                <CloseIcon 
                    sx={{position: 'absolute', top: '30px', left: '20px', fontSize: '40px', cursor: 'pointer'}}
                    onClick={basketActiveHandler}
                />
               {renderBasketContent()}
            </div>
            <div className="basket__overlay" style={{display: isActive ? 'block': 'none'}} onClick={basketActiveHandler}>

            </div>
        </div>
    )
}

export default Basket;