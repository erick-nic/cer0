import { ReactNode } from "react";
import style from "../styles/components/labels.module.css";

type Props = {
    name?: string,
    onClick?: () => void;
    onChange?: () => void;
    value: ReactNode;
    className?: string;
}

const Button: React.FC<Props> = ({ name, onClick, onChange, value, className }) => {
    return (
        <button
            className={style[ '' ] || className}
            onClick={onClick}
            onChange={onChange}
            name={name}
        >
            {value}
        </button>
    )
}

const Textarea: React.FC<Props> = ({ name, onClick, onChange, value, className }) => {
    return (
        <textarea
            className={style[ '' ] || className}
            onClick={onClick}
            onChange={onChange}
            name={name}
        >
            {value}
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
            {value}
        </select>
    )
}

export {
    Button,
    Textarea,
    Select
};