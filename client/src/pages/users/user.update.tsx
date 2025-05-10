import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '../../components/labels';
import Cards from '../../components/cards';
import { X } from 'lucide-react';
import { pageBack } from '../../utils/handlers';
import useFetchData from '../../hooks/useFetchData';
import style from '../../styles/pages/absolute-pages.module.css';
import IUsers from '../../types/interface.user';

const UpdateUser = () => {
    const initialState: IUsers = {
        email: '',
        password: '',
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: ''
        },
        phone: '',
    };

    const { id } = useParams<{ id: string }>();
    const URL = `http://localhost:3001/api/v0/update-user/${id}`;
    const navigate = useNavigate();

    const [ user, setUser ] = useState<IUsers>(initialState);
    const { data, loading, error } = useFetchData<IUsers[]>(`http://localhost:3001/api/v0/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        mode: 'cors',
        credentials: 'include',
    });
    const [ message, setMessage ] = useState<string | null>(null);

    if (data && !loading && !error) {
        const user = data.find((u) => u._id === id);
        if (user && user._id !== id) {
            setUser(user);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevData) => {
            if (name in prevData.address) {
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [ name ]: value,
                    },
                };
            } else {
                return {
                    ...prevData,
                    [ name ]: value,
                };
            }
        });
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
                    <label htmlFor="email">Email:</label>
                    <Input
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder={user.email}
                    />
                    <label htmlFor="password">Price:</label>
                    <Input
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder={user.password}
                    />
                    <label htmlFor="phone">Phone:</label>
                    <Input
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        placeholder={user.phone}
                    />
                    <label htmlFor="street">Street:</label>
                    <Input
                        name="street"
                        value={user.address.street}
                        onChange={handleChange}
                        placeholder={user.address.street}
                    />
                    <label htmlFor="city">City:</label>
                    <Input
                        name="city"
                        value={user.address.city}
                        onChange={handleChange}
                        placeholder={user.address.city}
                    />
                    <label htmlFor="state">State:</label>
                    <Input
                        name="state"
                        value={user.address.state}
                        onChange={handleChange}
                        placeholder={user.address.state}
                    />
                    <label htmlFor="postalCode">Postal Code:</label>
                    <Input
                        name="postalCode"
                        value={user.address.postalCode}
                        onChange={handleChange}
                        placeholder={user.address.postalCode}
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