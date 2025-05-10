import { HTMLInputTypeAttribute, ReactNode } from "react";
import style from "../styles/components/labels.module.css";

type Props = {
    name?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>;
    value: ReactNode;
    className?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    required?: boolean;
}

const Button: React.FC<Props> = ({ name, onClick, value, className }) => {
    return (
        <button
            className={style[ '' ] || className}
            onClick={onClick}
            name={name}
        >
            {value}
        </button>
    )
}

const Textarea: React.FC<Props> = ({ name, onClick, onChange, value, className, placeholder }) => {
    return (
        <textarea
            className={style[ '' ] || className}
            onClick={onClick}
            onChange={onChange}
            name={name}
            placeholder={placeholder}

        >
        </textarea>
    )
}

const Select: React.FC<Props> = ({ name, onClick, onChange, value, className }) => {
    return (
        <select
            className={style[ '' ] || className}
            onClick={onClick}
            onChange={onChange}
            name={name}
        >
        </select>
    )
}

const Input: React.FC<Props> = ({ name, onClick, onChange, required, className, type, placeholder }) => {
    return (
        <input
            type={type}
            className={style[ '' ] || className}
            onClick={onClick}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            required={required}
        >
        </input>
    )
}

export {
    Button,
    Textarea,
    Select,
    Input
};