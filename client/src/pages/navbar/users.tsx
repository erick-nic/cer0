import { useEffect, useState } from "react";
import style from "../../styles/pages/pages.module.css"
import IUsers from "../../types/interface.user";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../../components/cards";
import { Button } from "../../components/labels";
import { Outlet, useNavigate } from "react-router-dom";
import { pageBack } from "../../utils/handlers";

const Users = () => {
    const URL = "http://localhost:3001/api/v0/users/";
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { data, loading, error, message } = useFetchData<IUsers>(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const updateUser = async (id: string) => {
        navigate(`/users/update/${id}`);
    }

    const deleteUser = async (id: string) => {
        navigate(`/users/delete/${id}`);
    }

    return (
        <div className={style[ 'pages' ]}>
            <div>
                <div>
                    <Button onClick={pageBack} value="Back" />
                </div>
                {loading && (
                    <Cards>
                        {loading}
                    </Cards>
                )}
                {error && (
                    <Cards>
                        {error}
                        {message}
                    </Cards>
                )}
                {data && (
                    <div className={style[ 'cards' ]}>
                        {data.map((data: IUsers) => (
                            <Cards key={data._id}>
                                <p>_id: {data._id}</p>
                                <p>Name: {data.name}</p>
                                <p>Email: {data.email}</p>
                                <p>Password: {data.password}</p>
                                <p>Phone: {data.phone}</p>
                                <div className={style[ 'buttons' ]}>
                                    <Button onClick={() => data._id && updateUser(data._id)} value="Update" />
                                    <Button onClick={() => data._id && deleteUser(data._id)} value="Delete" />
                                </div>
                            </Cards>
                        ))}
                    </div>
                )}
                <Outlet />
            </div>
        </div>
    )
}

export default Users;