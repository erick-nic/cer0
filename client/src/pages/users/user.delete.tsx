import { useNavigate, useParams } from "react-router-dom";
import style from "../../styles/pages/absolute-pages.module.css";
import { pageBack } from "../../utils/handlers";
import { X } from "lucide-react";
import { Button } from "../../components/labels";

const DeleteUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const URL = `http://localhost:3001/api/v0/delete-user/${id}`;
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
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
            const result = await res.json();
            if (res.ok) {
                alert(result.message);
                navigate('/users');
            }

            if (result.message === 'Token expired') {
                localStorage.removeItem('token');
                navigate('/login');
                return null;
            }

            if (result.message === 'Unauthorized') {
                localStorage.removeItem('token');
                navigate('/login');
                return null;
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    return (
        <div className={style[ 'pages' ]}>
                <X
                    className={style[ 'close' ]}
                    onClick={pageBack}
                />
                <form>
                    <p>
                        Are you sure you want to delete this user?
                    </p>
                    <Button
                        value="Delete"
                        onClick={handleSubmit}
                        type="submit"
                    />
                </form>
        </div>
    )
}

export default DeleteUser;
