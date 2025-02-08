import React from 'react'


import './Button1.css'

type button1Props = {
    text: string,
    style?: React.CSSProperties,
    onClick?: () => void
}

const Button1 = ({text, style, onClick}: button1Props) => {
    return (
        <div className="button_wrapper" style={style} onClick={onClick}>
            <button className="button1">
                {text}
            </button>
        </div>
        
    )
}

export default Button1;