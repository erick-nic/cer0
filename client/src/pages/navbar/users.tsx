import style from "../../styles/pages/pages.module.css";
import IUsers from "../../types/interface.user";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../../components/cards";
import { Button } from "../../components/labels";
import { Outlet, useNavigate } from "react-router-dom";
import { pageBack } from "../../utils/handlers";
import { useMemo } from "react";

const Users = () => {
    const URL = "http://localhost:3001/api/v0/users/";
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const fetchOptions = useMemo(() => ({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }), [ token ]);

    const { data, loading, error, message } = useFetchData<IUsers>(URL, fetchOptions);

    if (message === 'Token expired' || error === 'Token expired') {
        localStorage.removeItem('token');
        navigate('/login');
        return null;
    }

    if (message === 'Unauthorized' || error === 'Unauthorized') {
        localStorage.removeItem('token');
        navigate('/login');
        return null;
    }

    const updateUser = async (id: string) => {
        navigate(`/users/update/${id}`);
    };

    const deleteUser = async (id: string) => {
        navigate(`/users/delete/${id}`);
    };

    const report = async () => {
        navigate(`/users/reports`);
    };

    return (
        <div className={style[ 'pages' ]}>
            <div>
                <div>
                    <Button onClick={pageBack} value="Back" />
                    <Button onClick={report} value="Report" />
                </div>
                {loading && (
                    <Cards>
                        <p>Loading...</p>
                    </Cards>
                )}
                {!loading && error && (
                    <Cards>
                        {error}
                    </Cards>
                )}
                {data && (
                    <div className={style[ 'cards-container' ]}>
                        {data.map((data: IUsers) => (
                            <Cards key={data._id}>
                                <p>_id: {data._id}</p>
                                <p>Name: {data.name}</p>
                                <p>Email: {data.email}</p>
                                <p>Password: {data.password}</p>
                                <p>Phone: {data.phone}</p>
                                <p>City: {data.address.city}</p>
                                <p>State: {data.address.state}</p>
                                <p>Street: {data.address.street}</p>
                                <p>Postal Code: {data.address.postalCode}</p>
                                <div className={style[ 'buttons' ]}>
                                    <Button onClick={() => data._id && updateUser(data._id)} value="Update" />
                                    <Button onClick={() => data._id && deleteUser(data._id)} value="Delete" />
                                </div>
                            </Cards>
                        ))}
                    </div>
                )}
            </div>
            <Outlet />
        </div>
    );
};

export default Users;