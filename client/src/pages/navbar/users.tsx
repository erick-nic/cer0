import { useEffect, useState } from "react";
import style from "../../styles/products/reports/to-excel.module.css"
import IUsers from "../../types/interface.user";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Users = () => {
    const [ users, setUsers ] = useState<IUsers[]>([]);
    const [ response, setResponse ] = useState<String>();
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const data = await fetch("http://localhost:3001/api/v0/users", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!data.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const responseData: IUsers[] = await data.json();
                console.log(responseData);
                setUsers(responseData);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        }


        fetchUsers();
    }, []);

    const exportToExcel = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'users';
        const ws = XLSX.utils.json_to_sheet(users);
        const wb = { Sheets: { 'data': ws }, SheetNames: [ 'data' ] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([ excelBuffer ], { type: fileType });
        saveAs(data, fileName + fileExtension);
    }

    const returnPage = () => {
        window.history.back();
    }

    if (loading) return <div className={style[ 'loading' ]}>Loading...</div>;
    if (error) return <div className={style[ 'error' ]}>Error: {error}</div>;

    return (
        <div className={style[ 'products-reports' ]}>
            {response}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <button onClick={returnPage}>Back</button>
            <button onClick={exportToExcel}>Export to XLSX</button>
            {!loading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th>_id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th>CreatedAt</th>
                            <th>UpdateAt</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((users) => (
                            <tr key={users._id}>    
                                <td>{users._id}</td>
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{`${users.address.street}, ${users.address.city}, ${users.address.state}, ${users.address.postalCode}`}</td>
                                <td>{users.phone}</td>
                                <td>{users.password}</td>
                                <td>{users.createdAt}</td>
                                <td>{users.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default Users;