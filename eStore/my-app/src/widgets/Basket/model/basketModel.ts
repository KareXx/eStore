import { useDispatch, useSelector } from 'react-redux';

import { setBasket } from '../../../stateManager/actions';
import BasketItemType from '../../../types/basket';

import { useState, useMemo, useEffect } from "react";
import useHttp from "../../../hooks/httpHook";


const useBasket = () => {
    const basket: BasketItemType[] = useSelector((state: any) => state.products.basket);
    const dispatch = useDispatch();

    const isAuth = useSelector((state: any) => state.products.isAuth);

    const [successfulPurchase, setSuccessfulPurchase] = useState<boolean>(false)
    const [showContactForm, setShowContactForm] = useState<boolean>(false)

    const {request} = useHttp();

    const basketProductsQuantity = useMemo(() => 
        basket.reduce((sum, item) => sum + item.quantity, 0)
    ,[basket])

    const totalPrice = useMemo(() => 
        basket.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [basket]) 


    const buyButtonHandler = async() => {
        try{
            const data = {baskets: basket};
            const accessToken = localStorage.getItem('accessToken')

            if(isAuth ){
                const order = await request({
                    url: 'http://192.168.1.3:5000/order', 
                    method: 'POST', 
                    body: JSON.stringify(data), 
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }, 
                    credentials: 'include'
                })
                console.log(order);
                setSuccessfulPurchase(true);
                dispatch(setBasket([]))
            }else{
                setShowContactForm(true)
            } 
        }catch(error){
            setShowContactForm(true)
            console.log('Some error')
        }
        
    }

    const addToBasket = (elementId: number, price: number) => {
            const parsedBasket = basket.map((item: BasketItemType, index: number) => {
                if(item.id === elementId){
                    return {id: item.id,  quantity: item.quantity + 1, price: item.price}
                }
                return item
            })
            if (parsedBasket.every((item: BasketItemType) => item.id !== elementId)){
                parsedBasket.push({id: elementId, quantity: 1, price})
            }
            
            dispatch(setBasket(parsedBasket))
    }
    return {addToBasket, basket, successfulPurchase, setSuccessfulPurchase,  showContactForm,setShowContactForm, totalPrice, basketProductsQuantity, buyButtonHandler}
}

export default useBasket;