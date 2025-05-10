import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProducts } from '../../types/interface.products';
import { Button, Input } from '../../components/labels';
import Cards from '../../components/cards';
import { X } from 'lucide-react';
import { pageBack } from '../../utils/handlers';
import useFetchData from '../../hooks/useFetchData';
import style from '../../styles/pages/absolute-pages.module.css';

const UpdateUser = () => {
    const initialState: IProducts = {
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
    };

    const { id } = useParams<{ id: string }>();
    const URL = `http://localhost:3001/api/v0/update-user/${id}`;
    const navigate = useNavigate();

    const [ user, setUser ] = useState<IProducts>(initialState);
    const { data, loading, error } = useFetchData<IProducts[]>(`http://localhost:3001/api/v0/users/`);
    const [ message, setMessage ] = useState<string | null>(null);

    if (data && !loading && !error) {
        const userData = data.find((u) => u._id === id);
        if (userData && user._id !== userData._id) {
            setUser(userData);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [ name ]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        console.log(token);
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
                body: JSON.stringify(user),
                mode: 'cors',
                credentials: 'include',
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to update user');
            }

            setMessage(responseData.message || 'User updated successfully!');
            setTimeout(() => {
                pageBack();
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className={style[ 'loading' ]}>Loading...</div>;
    if (error) return <div className={style[ 'error' ]}>Error: {error}</div>;

    return (
        <div className={style[ 'pages' ]}>
            <Cards>
                <form onSubmit={handleSubmit}>
                    <X className={style[ 'close' ]} onClick={pageBack} />
                    <label htmlFor={user._id}>Name:</label>
                    <Input
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder={user.name}
                    />
                    <label htmlFor="description">Description:</label>
                    <Input
                        name="description"
                        value={user.description}
                        onChange={handleChange}
                        placeholder={user.description}
                    />
                    <label htmlFor="price">Price:</label>
                    <Input
                        name="price"
                        value={user.price}
                        onChange={handleChange}
                        placeholder={String(user.price)}
                    />
                    <label htmlFor="category">Category:</label>
                    <Input
                        name="category"
                        value={user.category}
                        onChange={handleChange}
                        placeholder={user.category}
                    />
                    <label htmlFor="brand">Brand:</label>
                    <Input
                        name="brand"
                        value={user.brand}
                        onChange={handleChange}
                        placeholder={user.brand}
                    />
                    <label htmlFor="images">Images:</label>
                    <Input
                        name="images"
                        value={user.images[ 0 ]}
                        onChange={handleChange}
                        placeholder={user.images[ 0 ]}
                    />
                    <label htmlFor="stock">Stock:</label>
                    <Input
                        name="stock"
                        value={user.stock}
                        onChange={handleChange}
                        placeholder={String(user.stock)}
                    />
                    <div className={style[ 'response' ]}>
                        {message}
                    </div>
                    <Button type="submit" value="Update" />
                </form>
            </Cards>
        </div>
    );
};

export default UpdateUser;