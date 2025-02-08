import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setBasket } from "../../stateManager/actions";
import BasketItemType from "../../types/basket";

import './ContactInformation.css'

type ContactInformationPropsType = {
    successfulPurchaseHandler: (val: boolean) => void 
}

const ContactInformation = ({successfulPurchaseHandler}: ContactInformationPropsType) => {
    const initialFormValue = {
        name: '',
        phone: '',
    }
    const basket: BasketItemType[] = useSelector((state: any) => state.products.basket);
    const [formData, setFormData] = useState(initialFormValue);

    const dispatch = useDispatch();

    const formDataHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        const data = {baskets: basket, contactInfo: formData}
        e.preventDefault();

        
        fetch('http://192.168.1.3:5000/order', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                // "Athorization": `Bearer ${accessToken}`
            },
            // credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setBasket([]))
            setFormData(initialFormValue)
            successfulPurchaseHandler(true)
        })
       
    }
        

    return (
        <div className="contact-information">
            <div className="basket__title">Please provide your contact information</div>
            <form className="contact-information__form" onSubmit={submitHandler}>
                <div className="contact-information__form__inputs">
                    <input onChange={formDataHandler} type="text" name='name' placeholder='Name'/>
                    <input onChange={formDataHandler} type="text" name='phone' placeholder='Phone'/>
                </div>
                <div className="basket__details__buttons">
                    <button type="submit">Send</button>
                </div>
            </form>
            
        </div>
    )
}


export default ContactInformation;