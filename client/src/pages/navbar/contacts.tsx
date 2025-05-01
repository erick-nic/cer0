import React from "react";
import style from "../../styles/pages/pages.module.css";
import Style from "../../styles/components/labels.module.css";
import Cards from "../../components/cards";
import { Button, Input } from "../../components/labels";
import IUsers from "../../types/interface.user";
import useFetchData from "../../hooks/useFetchData";

const Contacts: React.FC = () => {
    const handleSubmit = () => {

    }
    return (
        <div className={style[ 'pages' ]}>
            <Input
                name="name"
                value="TODO"
                placeholder="TODO"
            />
            <Button
                className={Style[ 'styled-button' ]}
                type="submit"
                onClick={handleSubmit}
                value="Contact us"
            />
        </div>
    );
}

export default Contacts;