import { X } from 'lucide-react';
import style from "../../styles/pages/absolute-pages.module.css";
import { useState } from 'react';
import ICategory from '../../types/interface.category';
import { Button, Input } from '../../components/labels';

const Category = () => {
    const pageBack = () => {
        window.history.back();
    };

    const initialState: ICategory = ({
        name: '',
        description: '',
        image: ''
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
            setTimeout(() => {
                window.history.back();
            }, 5000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={style[ 'pages' ]}>
                <div className={style[ 'response' ]} >
                    {response}
                </div>
                <form onSubmit={handleSubmit}>
                    <X
                        className={style[ 'close' ]}
                        onClick={pageBack}
                    />
                    <Input
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        placeholder='Category Name'
                    />
                    <Input
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        placeholder='Category Description'
                    />
                    <Input
                        name="image"
                        value={category.image}
                        onChange={handleChange}
                        placeholder='Image URL'
                    />
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        value="Create"
                    />
                </form>
        </div>
    );
};

export default Category;