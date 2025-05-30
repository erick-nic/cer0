import React from "react";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../../components/cards";
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
            <h3 className={style[ 'tittle' ]}>
                Products Categories
            </h3>
            {loading &&
                <Cards>
                    <p>Loading...</p>
                </Cards>
            }
            {error &&
                <Cards>
                    <p>Error: {error}</p>
                </Cards>
            }

            {data && (
                <div className={style[ 'cards-container' ]}>
                    {data.map((category: any) => (
                        <Cards key={category._id}>
                            <p>{category.name}</p>
                            <img src={category.image} alt={category._id} onClick={() => handleClick(category._id)} />
                        </Cards>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;