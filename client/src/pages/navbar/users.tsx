import { useEffect, useState } from "react";
import style from "../../styles/pages/pages.module.css"
import IUsers from "../../types/interface.user";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../../components/cards";
import Reports from "../products/reports";
import ReportsUsers from "../users/user.report";
import { Button } from "../../components/labels";
import { useNavigate } from "react-router-dom";
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

    function updateUser(_id: string | undefined) {
        throw new Error("Function not implemented.");
    }

    function deleteUser(_id: string | undefined) {
        throw new Error("Function not implemented.");
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
                                    <Button onClick={() => updateUser(data?._id)} value="Update" />
                                    <Button onClick={() => deleteUser(data?._id)} value="Delete" />
                                </div>
                            </Cards>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Users;