import { useNavigate, useParams } from "react-router-dom";
import style from "../../styles/pages/pages.module.css";
import Style from "../../styles/pages/absolute-pages.module.css";
import { useEffect, useState } from "react";
import { IProducts } from "../../types/interface.products";
import { pageBack } from "../../utils/handlers";
import { X } from "lucide-react";
import { Button } from "../../components/labels";
import Cards from "../../components/cards";

const Details: React.FC = () => {
    const initialState: IProducts = ({
        name: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        stock: 0,
        images: [ '' ],
        attributes: {},
        rating: undefined,
        reviews: [],
    });

    const { id } = useParams<{ id: string }>();
    const URL = `${'http://localhost:3001/api/v1/get-products'}/${id}`;
    const [ error, setError ] = useState<string | null>(null);
    const [ productDetailed, setProductDetailed ] = useState<IProducts>(initialState);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: IProducts = await response.json();
                setProductDetailed(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        }

        fetchData();
    }, [ id ]);

    if (error) return <div className={style[ 'error' ]}>Error: {error}</div>;

    return (
        <div className={style[ 'pages' ]}>
            <div className={style[ 'cards-container' ]}>
                <Cards>
                    <img src={productDetailed?.images ? productDetailed.images[ 0 ] : undefined}
                        alt={productDetailed?.description}
                        width={500} height={500} />
                    <p>_id: {productDetailed?._id}</p>
                    <p>Brand: {productDetailed?.brand}</p>
                    <p>Category: {productDetailed?.category}</p>
                    <p>Description: {productDetailed?.description}</p>
                    <p>Price: ${productDetailed?.price}</p>
                    <p>Stock: {productDetailed?.stock}</p>
                    <Button onClick={pageBack} value="Back" />
                </Cards>
            </div>
        </div>
    );
}

export default Details;
