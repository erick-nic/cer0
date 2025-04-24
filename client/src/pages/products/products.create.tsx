import React, { useState } from "react";
import { IProducts } from "../../types/interface.products";
import style from "../../styles/products/create.module.css";
import Style from "../../styles/pages/absolute-pages.module.css"
import { X } from "lucide-react";
import ICategory from "../../types/interface.category";
import useFetchData from "../../hooks/useFetchData";
import { useFormHandlers } from "../../hooks/useFormHandlers";
import { pageBack } from "../../utils/handlers";
import useSubmitData from "../../hooks/useSubmitData";
import { TErrors } from "../../types/type.error";
import Cards from "../../components/cards";

const Create: React.FC = () => {
    const initialState: IProducts = {
        name: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
        stock: 0,
        images: [ "" ],
        attributes: {},
        rating: undefined,
        reviews: [],
    };

    const categories = useFetchData<ICategory[]>(
        "http://localhost:3001/api/v3/get-categories"
    );

    const {
        data,
        handleChange,
        handleAttributesChange,
        handleImagesChange,
        addImageField,
    } = useFormHandlers(initialState);

    const { submitData, message } = useSubmitData<IProducts>();
    const [ error, setError ] = useState<TErrors[ 'products' ]>({});
    const handleErrors = () => {
        const errors: TErrors[ 'products' ] = {}
        if (data.description.length < 10) {
            errors.description = 'Description must be a least 10 caracters'
        }
        return errors
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errorValidation = handleErrors();
        setError(errorValidation);
        const token = localStorage.getItem('token');
        const submitUrl = "http://localhost:3001/api/v1/create-products/";
        const submitOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
            },
            body: JSON.stringify(data),
        };

        await submitData(submitUrl, submitOptions);
    }

    return (
        <aside className={style[ "create-products" ]}>
            <X className={style[ "close" ]} onClick={pageBack} />
            <Cards className={Style[ "pages" ]}>
                {message}
            </Cards>
            <form onSubmit={handleSubmit} className={style[ "create-form" ]}>
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
                <textarea
                    name="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={handleChange}
                    required
                />
                <div>{error.description}</div>
                <p>Products price</p>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={data.price}
                    onChange={handleChange}
                    required
                />
                <p>Category</p>
                <select
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.data?.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
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
                <p>Insert URL for images</p>
                <div className={style[ "add-images" ]}>
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
                <p>Product color</p>
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={data.attributes?.color || ""}
                    onChange={handleAttributesChange}
                />
                <p>Product size</p>
                <input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    value={data.attributes?.weight || ""}
                    onChange={handleAttributesChange}
                />
                <p>Product dimensions</p>
                <input
                    type="text"
                    name="dimensions"
                    placeholder="Dimensions"
                    value={data.attributes?.dimensions || ""}
                    onChange={handleAttributesChange}
                />
                <div className={style[ "save-quit" ]}>
                    <button type="submit">Submit</button>
                    <button onClick={pageBack}>Cancel</button>
                </div>
            </form>
        </aside>
    );
};

export default Create;