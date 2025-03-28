import React from "react";
import { Button } from "../../components/labels";

const Home: React.FC = () => {
    const handleClick = () => {
        window.history.back();
    }

    return (
        <>
            <Button name="button" value="Home" onClick={handleClick} />
        </>
    );
}

export default Home;