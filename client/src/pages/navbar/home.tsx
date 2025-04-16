import React from "react";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../../components/cards";
import { Button } from "../../components/labels";
import style from "../../styles/pages/pages.module.css";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const URL = "http://localhost:3001/api/v3/get-categories";
    const { data, loading, error } = useFetchData<{ _id: string; name: string }[]>(URL);
    const navTo = useNavigate();
    const handleClick = (id: string) => {
        navTo(`/products/by-category/${id}`);
    }
        
    return (
        <div className={style[ 'pages' ]}>
            <Button value="Create Category" onClick={() => console.log("Create Category")} />
            <Button value="Create Product" onClick={() => console.log("Create Product")} />
            <Button value="Report XLSX" onClick={() => console.log("Report XLSX")} />

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {data && (
                <div className={style[ 'cards-container' ]}>
                    {data.map((category: any) => (
                        <Cards key={category._id}>
                            <p>{category.name}</p>
                            <img src={category.image} alt={category._id} onClick={() => handleClick(category._id)}/>
                        </Cards>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;