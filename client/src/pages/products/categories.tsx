import { X } from 'lucide-react';
import style from "../../styles/products/categories.module.css";
import { useState } from 'react';
import ICategory from '../../types/interface.category';

const Category = () => {
    const handleCancel = () => {
        window.history.back();
    };

    const initialState: ICategory = ({
        name: '',
        description: ''
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setCategories((prev) => ({
            ...prev,
            [ name ]: value,
        }));
    };

    const [ category, setCategories ] = useState<ICategory>(initialState);
    const [ response, setResponse ] = useState();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const URL = 'http://localhost:3001/api/v3/create-category/';
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            });
            const resData = await res.json();
            setResponse(resData.message);
            alert(resData.message);
            window.history.back();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={style[ 'category-create' ]}>
            <X className={style[ 'close' ]} onClick={handleCancel} />
            <form onSubmit={handleSubmit} className={style[ 'category-form' ]}>
                <div className={style[ 'response' ]} >
                    {response}
                </div>

                <h3>Create a Category</h3><br />
                <label>Name</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={category.name}
                    required
                />
                <label>Description</label>
                <textarea
                    onChange={handleChange}
                    name="description"
                    value={category.description}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Category;