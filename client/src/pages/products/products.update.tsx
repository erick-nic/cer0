import { useParams } from "react-router-dom";
import style from "../../styles/pages/absolute-pages.module.css";
import { useState } from "react";
import { IProducts } from "../../types/interface.products";
import { Button, Input } from "./../../components/labels";
import Cards from "../../components/cards";
import { X } from "lucide-react";
import { pageBack } from "../../utils/handlers";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

const Update: React.FC = () => {
    const initialState: IProducts = {
        name: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        stock: 0,
        images: [''],
        attributes: {},
        rating: undefined,
        reviews: [],
    };

    const { id } = useParams<{ id: string }>();
    const URL = `http://localhost:3001/api/v1/update-products/${id}`;
    const navigate = useNavigate();

    const [products, setProducts] = useState<IProducts>(initialState);
    const { data, loading, error, message } = useFetchData<IProducts[]>(`http://localhost:3001/api/v1/get-products`);

    if (data && !loading && !error) {
        const product = data.find((p) => p._id === id);
        if (product && products._id !== product._id) {
            setProducts(product);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProducts({ ...products, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('No authentication token found');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(products),
                mode: 'cors',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            alert('Product updated successfully!');
            pageBack();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className={style['loading']}>Loading...</div>;
    if (error) return <div className={style['error']}>Error: {error}</div>;

    return (
        <div className={style['pages']}>
            <Cards>
                {message}
                <form onSubmit={handleSubmit}>
                    <X className={style['close']} onClick={pageBack} />
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
                        value={products.images[0]}
                        onChange={handleChange}
                        placeholder={products.description}
                    />
                    <Input
                        name="stock"
                        value={products.stock}
                        onChange={handleChange}
                        placeholder={String(products.stock)}
                    />
                    <Button type="submit" value="Update" />
                </form>
            </Cards>
        </div>
    );
};

export default Update;