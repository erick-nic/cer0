import React, { useState } from "react";
import { IProducts } from "../../../types/interface.products";
import { config } from "../../../config";
import { TErrors } from "../../../types/type.error";
import style from "../../../styles/products/create.module.css"
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';


const Create: React.FC = () => {
    const initialState: IProducts = ({
        name: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        stock: 0,
        images: [ '' ],
        attributes: {},
        rating: undefined,
        reviews: [],
    });

    const [ data, setData ] = useState<IProducts>(initialState);
    const [ error, setError ] = useState<TErrors[ 'products' ]>({});
    const [ response, setResponse ] = useState<string>('');
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/products');
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [ name ]: value,
        }));
    };

    const handleAttributesChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                [ name ]: value,
            },
        }));
    };

    const handleImagesChange = (index: number, value: string) => {
        const updatedImages = [ ...data.images ];
        updatedImages[ index ] = value;
        setData((prev) => ({
            ...prev,
            images: updatedImages,
        }));
    };

    const addImageField = () => {
        setData((prev) => ({
            ...prev,
            images: [ ...prev.images, "" ],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const URL = 'http://localhost:3001/api/v1/create-products/';
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            setResponse(resData.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <aside className={style[ 'create-products' ]} >
            <X className={style[ 'close' ]} onClick={handleCancel} />
            <form onSubmit={handleSubmit} className={style[ 'create-form' ]}>
                <p>Product name</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={data.name}
                    onChange={handleChange}
                    required
                />
                <p>Description</p>
                <p>Max 200 characters</p><br />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={handleChange}
                    required
                />
                <p>Products price</p><br />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={data.price}
                    onChange={handleChange}
                    required
                />
                <p>Category</p>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={data.category}
                    onChange={handleChange}
                    required
                />
                <p>Brand</p>
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={data.brand}
                    onChange={handleChange}
                    required
                />
                <p>Stock</p>
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={data.stock}
                    onChange={handleChange}
                    required
                />
                <p>Insert URL for images</p><br />
                <div className={style[ 'add-images' ]}>
                    {data.images.map((image, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder={`Image URL ${index + 1}`}
                                value={image}
                                onChange={(e) => handleImagesChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addImageField}>
                        Add URL
                    </button>
                </div>
                <p>Product color</p><br />
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={data.attributes?.color || ""}
                    onChange={handleAttributesChange}
                />
                <p>Product size</p><br />
                <input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    value={data.attributes?.weight || ""}
                    onChange={handleAttributesChange}
                />
                <p>Product dimensions</p><br />
                <input
                    type="text"
                    name="dimensions"
                    placeholder="Dimensions"
                    value={data.attributes?.dimensions || ""}
                    onChange={handleAttributesChange}
                />

                <div className={style[ 'save-quit' ]}>
                    <button type="submit">Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </aside>
    );
};

export default Create;
