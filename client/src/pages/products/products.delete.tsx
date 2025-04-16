import { useParams } from "react-router-dom";
import style from "../../styles/pages/absolute-pages.module.css";
import useFetchData from "../../hooks/useFetchData";
import { pageBack } from "../../utils/handlers";
import Cards from "../../components/cards";
import { X } from "lucide-react";

const Delete: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const URL = `http://localhost:3001/api/v1/delete-products/${id}`;

    const response = useFetchData(URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        mode: 'cors',
        credentials: 'include',
    });

    return (
        <div className={style[ 'pages' ]}>
            <Cards>
                <X
                    className={style[ 'close' ]}
                    onClick={pageBack}
                />
                {
                    response.loading ? (
                        <p>Loading...</p>
                    ) : response.error ? (
                        <p>Error: {response.error}</p>
                    ) : (
                        <div>
                            <p>{JSON.stringify(response.data)}</p>
                        </div>
                    )
                }

            </Cards>
        </div>
    )
}

export default Delete
