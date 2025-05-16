import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '../../components/labels';
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
    const token = localStorage.getItem('token');
    const fetchOptions = useMemo(() => ({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }), [ token ]);

    const { data, loading, error } = useFetchData<IUsers[]>(`http://localhost:3001/api/v0/users`, fetchOptions);
    const [ message, setMessage ] = useState<string | null>(null);
    const [ errors, setErrors ] = useState<{ [ key: string ]: string }>({});

    useEffect(() => {
        if (data && !loading && !error) {
            const foundUser = data.find((u) => u._id === id);
            if (foundUser) {
                setUser(foundUser);
            }
        }
    }, [ data, loading, error, id ]);

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

    const validate = () => {
        const newErrors: { [ key: string ]: string } = {};
        if (!user.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Invalid Email";
        }
        if (!user.password) {
            newErrors.password = "Password is required";
        } else if (user.password.length < 8) {
            newErrors.password = "The password must be at least 8 characters";
        }
        if (!user.address.street) newErrors.street = "Street is required";
        if (!user.address.city) newErrors.city = "City is required";
        if (!user.address.state) newErrors.state = "State is required";
        if (!user.address.postalCode) newErrors.postalCode = "Postal code is required";
        if (!user.phone) newErrors.phone = "Phone is required";
        return newErrors;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return; // No enviar si hay errores
        }

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
            <form onSubmit={handleSubmit}>
                <X className={style[ 'close' ]} onClick={pageBack} />
                <Input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder={user.email}
                />
                <div className="error">{errors.email}</div>

                <Input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder={user.password}
                />
                <div className="error">{errors.password}</div>
                <Input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder={user.phone}
                />
                <div className="error">{errors.phone}</div>

                <Input
                    type="text"
                    name="street"
                    value={user.address.street}
                    onChange={handleChange}
                    placeholder={user.address.street}
                />
                <div className="error">{errors.street}</div>

                <Input
                    type="text"
                    name="city"
                    value={user.address.city}
                    onChange={handleChange}
                    placeholder={user.address.city}
                />
                <div className="error">{errors.city}</div>

                <Input
                    type="text"
                    name="state"
                    value={user.address.state}
                    onChange={handleChange}
                    placeholder={user.address.state}
                />
                <div className="error">{errors.state}</div>

                <Input
                    type="text"
                    name="postalCode"
                    value={user.address.postalCode}
                    onChange={handleChange}
                    placeholder={user.address.postalCode}
                />
                <div className="error">{errors.postalCode}</div>


                <div className={style[ 'response' ]}>
                    {message}
                </div>
                <Button type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;