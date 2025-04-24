import style from "../styles/components/cards.module.css";

type Props = {
    children?: React.ReactNode,
    className?: string;
}

const Cards: React.FC<Props> = ({ children, className }) => {
    return (
        <div className={style[ 'cards' ] || className}>
            { children }
        </div>
    )
}

export default Cards;