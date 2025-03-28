import style from "../styles/components/labels.module.css";

type Props = {
    name: string,
    onClick?: () => void;
    onChange?: () => void;
    value: string
}

const Button: React.FC<Props> = ({ name, onClick, onChange, value }) => {
    return (
        <button
            className={style[ '' ]}
            onClick={onClick}
            onChange={onChange}
            name={name}
        >
            {value}
        </button>
    )
}

const Textarea: React.FC<Props> = ({ name, onClick, onChange, value }) => {
    return (
        <textarea
            className={style[ '' ]}
            onClick={onClick}
            onChange={onChange}
            name={name}
        >
            {value}
        </textarea>
    )
}

const Select: React.FC<Props> = ({ name, onClick, onChange, value }) => {
    return (
        <select
            className={style[ '' ]}
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