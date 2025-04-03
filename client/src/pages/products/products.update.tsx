import { useParams } from "react-router-dom";
import style from "../../styles/products/absolute-pages.module.css";
import { useEffect, useState } from "react";
// import { config } from "../../config";
import { IProducts } from "../../types/interface.products";
import { Button, Input } from "./../../components/labels";
import Cards from "../../components/cards";
import { X } from "lucide-react";

const Update: React.FC = () => {
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
    // const getProducts: string = config.getProducts;
    const URL = `${'http://localhost:3001/api/v1/update-products'}/${id}`;
    const [ error, setError ] = useState<string | null>(null);
    const [ products, setProducts ] = useState<IProducts>(initialState);
    const [ loading, setLoading ] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProducts({ ...products, [ name ]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No authentication token found');
            return;
        }

        try {
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(products),
                mode: 'cors',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            alert('Product updated successfully!');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };


    useEffect(() => {
        const productData = async () => {
            try {
                const data = await fetch('http://localhost:3001/api/v1/get-products');
                if (!data.ok) {
                    throw new Error('Network response was not ok');
                }
                const product: IProducts[] = await data.json();
                const productId = product.find((p) => p._id === id);
                if (!productId) {
                    throw new Error('Product not found');
                }
                setProducts(productId);
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
                setLoading(false);
            }
        };
        productData();
    }, [ id ]);

    const handleCancel = () => {
        window.history.back();
    }

    const handleClick = () => {
        window.location.reload();
    }
    if (error) return <div className={style[ 'error' ]}>Error: {error}</div>;

    return (
        <div className={style[ 'pages' ]}>
            <Cards>
                <form onSubmit={handleSubmit}>
                    <X
                        className={style[ 'close' ]}
                        onClick={handleCancel}
                    />
                    <Input
                        name="name"
                        value={products.name}
                        onChange={handleChange}
                        placeholder={products.name}
                    />
                    <Input
                        name="description"
                        value={products.description}
                        onChange={handleChange}
                        placeholder={products.description}
                    />
                    <Input
                        name="price"
                        value={products.price}
                        onChange={handleChange}
                        placeholder={String(products.price)}
                    />
                    <Input
                        name="category"
                        value={products.category}
                        onChange={handleChange}
                        placeholder={products.category}
                    />
                    <Input
                        name="brand"
                        value={products.brand}
                        onChange={handleChange}
                        placeholder={products.brand}
                    />
                    <Input
                        name="images"
                        value={products.images[ 0 ]}
                        onChange={handleChange}
                        placeholder={products.images[ 0 ]}
                    />
                    <Input
                        name="rating"
                        value={products.rating}
                        onChange={handleChange}
                        placeholder={String(products.rating)}
                    />
                    <Button
                        type="submit"
                        value="Update"
                        onClick={handleClick}
                    />
                </form>
            </Cards>
        </div >
    );
}

export default Update;
