import React from "react"
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import style from "../../styles/pages/pages.module.css";
import { IProducts } from "../../types/interface.products";
import Cards from "../../components/cards";

const ByCategory: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const URL = `http://localhost:3001/api/v1/get-products/by-category/${id}`;
    const { data, loading, error } = useFetchData<IProducts[]>(URL);

    return (
        <div className={style[ 'pages' ]}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {data && (
                <div className={style[ 'cards-container' ]}>
                    {data.map((product: IProducts) => (
                        <Cards key={product._id}>
                            <img src={product.images[0]} alt={product.name} />
                            <p>{product.name}</p>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </Cards>
                    ))}
                </div>
            )}
            
        </div>
    )
};

export default ByCategory;
