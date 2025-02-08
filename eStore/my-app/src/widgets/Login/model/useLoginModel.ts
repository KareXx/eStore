import { useState } from "react";
import { useDispatch } from "react-redux";

import { setIsAuth,  setUserDto } from "../../../stateManager/actions";

export const useLoginModel = () => {
    const initialFormValue = {
        email: '',
        password: '',
    }
    const [formData, setFormData] = useState(initialFormValue)
    const [emailIsActive, setEmailIsActive] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    
    const dispatch = useDispatch();

    const formDataHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const validateEmail = () => {
        if(emailIsActive){
            const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ;
            setIsValid(EMAIL_REGEXP.test(formData.email) || formData.email.length ===  0)
        }
        setEmailIsActive(false)
    }
    
    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isValid){
            setFormData(initialFormValue)

            fetch('http://192.168.1.3:5000/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                dispatch(setIsAuth(true))
                dispatch(setUserDto(data.userDto))
                console.log('Login', data)
                localStorage.setItem('accessToken', data.accessToken);
                
            })
        }
        
    }

    return {
        login,
        isValid,
        formDataHandler,
        setEmailIsActive,
        validateEmail,
        formData,
    }

}