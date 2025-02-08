import React from "react";
import './Checkbox.css';

type CheckboxProps = {
    title: string;
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
};

const Checkbox = ({ title, isChecked, onChange }: CheckboxProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked); // Отправка нового состояния в родительский компонент
    };

    return (
        <div className="checkbox">
            <input 
                type="checkbox" 
                id={title} 
                name={title} 
                checked={isChecked}
                onChange={handleInputChange} // Указан onChange для управления состоянием
            />
            <label htmlFor={title}>{title}</label>
        </div>
    );
};

export default Checkbox;