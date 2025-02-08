import { useLoginModel } from '../model/useLoginModel';

import PasswordIcon from '@mui/icons-material/Password';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


import './Login.css'


type LoginPropsType = {
    loginHandler: (isActive: boolean) => void
}


const Login = ({ loginHandler}: LoginPropsType) => {

    const {
        login,
        isValid,
        formDataHandler,
        setEmailIsActive,
        validateEmail,
        formData,
    } = useLoginModel()

    return (
        <div className="login">
            <div className="login__wrapper" onClick={(e) => loginHandler(false)}>
                <div className="login__panel" onClick={(e) => e.stopPropagation()}>
                    <div className="login__panel__wrapper">
                        <div className="login__panel__image">
                            <img src="https://i.pinimg.com/736x/32/a0/3d/32a03d83053dc2ec47775887adaa40e6.jpg" alt="" />
                        </div>
                        <div className="login__panel__form">
                            <div className="login__panel__form__wrapper">
                                <div className="login__panel__form__title">Login</div>
                                <form action="" onSubmit={login}>
                                    <div className="login__panel__filed">
                                        <div className="login__panel__filed__icon" style={!isValid  ? {backgroundColor: '#780606'}: {}}><AlternateEmailIcon sx={{color: '#e2d9d5'}}/></div>
                                        <input 
                                            onChange={formDataHandler}
                                            onFocus={() => setEmailIsActive(true)}
                                            onBlur={validateEmail}
                                            value={formData.email}
                                            type="text" 
                                            id='email' 
                                            name='email' 
                                            placeholder='EMAIL'
                                        />
                                    </div>
                                    <div className="login__panel__filed" >
                                        <div className="login__panel__filed__icon" ><PasswordIcon sx={{color: '#e2d9d5'}}/></div>
                                        <input 
                                            onChange={formDataHandler}
                                            value={formData.password}
                                            type="password" 
                                            id='password' 
                                            name='password' 
                                            placeholder='PASSWORD'
                                        />
                                    </div>
                                    <div className="login__panel__button">
                                        <button type='submit'>login</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;