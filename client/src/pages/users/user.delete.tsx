import { useParams } from "react-router-dom";
import style from "../../styles/pages/absolute-pages.module.css";
import { pageBack } from "../../utils/handlers";
import Cards from "../../components/cards";
import { X } from "lucide-react";
import { Button } from "../../components/labels";

const DeleteUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const URL = `http://localhost:3001/api/v0/delete-user/${id}`;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            alert('No authentication token found');
            return;
        }

        try {
            const res = await fetch(URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                mode: 'cors',
                credentials: 'include',
            });
            if (res.ok) {
                alert('User deleted successfully');
                pageBack();
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    return (
        <div className={style[ 'pages' ]}>
            <Cards>
                <X
                    className={style[ 'close' ]}
                    onClick={pageBack}
                />
                <form>
                    <label htmlFor="delete">
                        Are you sure you want to delete this user?
                    </label>
                    <Button
                        value="Delete"
                        onClick={handleSubmit}
                        type="submit"
                    />
                </form>
            </Cards>
        </div>
    )
}

export default DeleteUser;
