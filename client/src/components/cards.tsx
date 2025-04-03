import style from "../styles/components/cards.module.css";

type Props = {
    children?: React.ReactNode
}

const Cards: React.FC<Props> = ({ children }) => {
    return (
        <div className={style[ 'card' ]}>
            { children }
        </div>
    )
}

export default Cards;