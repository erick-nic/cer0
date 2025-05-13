import React, { useState } from "react";
import { IProducts } from "../../types/interface.products";
import style from "../../styles/products/create.module.css";
import Style from "../../styles/pages/absolute-pages.module.css"
import { X } from "lucide-react";
import ICategory from "../../types/interface.category";
import useFetchData from "../../hooks/useFetchData";
import { useFormHandlers } from "../../hooks/useFormHandlers";
import { pageBack, pageReload } from "../../utils/handlers";
import useSubmitData from "../../hooks/useSubmitData";
import { TErrors } from "../../types/type.error";
import Cards from "../../components/cards";
import { Button, Input, Textarea } from "../../components/labels";

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
        if (!data.name) {
            errors.name = 'Name is required'
        }
        if (!data.price) {
            errors.price = 'Price is required'
        }

        if (data.description.length < 1) {
            errors.description = 'Description must be at least 10 character long'
        }
        if (data.category.length < 1) {
            errors.category = 'Category is required'
        }
        if (data.brand.length < 1) {
            errors.brand = 'Brand is required'
        }
        if (!data.stock) {
            errors.stock = 'Stock is required'
        }
        if (data.images.length < 1) {
            errors.images = 'At least one image is required'
        }
        if (data.images.some((image) => image.length < 1)) {
            errors.images = 'All images must be valid URLs'
        }
        if (!data.attributes?.dimensions) {
            errors.attributes = errors.attributes || {};
            errors.attributes.color = 'Attributes color is required';
        }
        if (!data.attributes?.weight) {
            errors.attributes = errors.attributes || {};
            errors.attributes.weight = 'Weight is required';
        }
        if (!data.attributes?.dimensions) {
            errors.attributes = errors.attributes || {};
            errors.attributes.dimensions = 'Dimensions is required';
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
            <Cards>
                <X className={style[ "close" ]} onClick={pageBack} />
                <form onSubmit={handleSubmit} className={style[ "create-form" ]}>
                    <p>Product name</p>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={handleChange}
                        required
                    />
                    <p>Description</p>
                    <Textarea
                        name="description"
                        placeholder="Description"
                        value={data.description}
                        onChange={handleChange}
                        required
                    />
                    <div>{error.description}</div>
                    <p>Products price</p>
                    <Input
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
                    <Input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={data.brand}
                        onChange={handleChange}
                        required
                    />
                    <p>Stock</p>
                    <Input
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
                    <Input
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={data.attributes?.color || ""}
                        onChange={handleAttributesChange}
                    />
                    <p>Product size</p>
                    <Input
                        type="text"
                        name="weight"
                        placeholder="Weight"
                        value={data.attributes?.weight || ""}
                        onChange={handleAttributesChange}
                    />
                    <p>Product dimensions</p>
                    <Input
                        type="text"
                        name="dimensions"
                        placeholder="Dimensions"
                        value={data.attributes?.dimensions || ""}
                        onChange={handleAttributesChange}
                    />
                    <Cards className={Style[ "pages" ]}>
                        {message}
                        <Button value="Save" onClick={handleSubmit} />
                        <Button value="Cancel" onClick={pageBack} />
                    </Cards>
                </form>
            </Cards>
        </aside >
    );
};

export default Create;