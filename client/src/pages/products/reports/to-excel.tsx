import React from 'react';
import { IProducts } from '../../../types/interface.products';
import style from "../../../styles/products/reports/to-excel.module.css";
import useFetchData from "./../../../hooks/useFetchData";
import { exportToExcel } from "../../../utils/export-to-exel";
import { pageBack } from "../../../utils/handlers";

const Report: React.FC = () => {
    const { data, loading, error } = useFetchData<IProducts[]>('http://localhost:3001/api/v1/get-products');

    const handleExport = () => {
        if (data) {
            exportToExcel(data, 'products-report');
        }
    };

    return (
        <div className={ style[ 'products-reports' ]}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <button onClick={pageBack}>Back</button>
            <button onClick={handleExport}>Export to XLSX</button>
            {!loading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th>_id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((product, index) => (
                            <tr key={index}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Report;
