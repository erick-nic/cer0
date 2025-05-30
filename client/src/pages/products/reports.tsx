import React from "react";
import Report from "../../utils/generate-reports";
import { IProducts } from "../../types/interface.products"
import style from "../../styles/pages/pages.module.css"

const Reports: React.FC = () => {
    const columns = [ "_id", "Name", "Brand", "Price", "Description", "Stock", "Create At" ];

    const mapDataToRow = (product: IProducts) => (
        <>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.stock}</td>
            <td>{String(product.createdAt)}</td>
        </>
    );

    const endpoint = {
        url: "http://localhost:3001/api/v1/get-products/",
        options: {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    };

    return (
        <div className={style[ 'pages' ]}>
            <Report
                endpoint={endpoint}
                columns={columns}
                mapDataToRow={mapDataToRow}
                fileName="products_report"
            />
        </div>
    );
}

export default Reports;