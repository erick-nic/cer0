import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IProducts } from '../../../types/interface.products';
import style from "../../../styles/products/reports/to-excel.module.css";

const Report: React.FC = () => {
    const [ products, setProducts ] = useState<IProducts[]>([]);
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/get-products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: IProducts[] = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const exportToExcel = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'products';
        const ws = XLSX.utils.json_to_sheet(products);
        const wb = { Sheets: { 'data': ws }, SheetNames: [ 'data' ] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([ excelBuffer ], { type: fileType });
        saveAs(data, fileName + fileExtension);
    }
    
    const returnPage = () => {
        window.history.back();
    }

    return (
        <div className={ style[ 'products-reports' ]}>
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
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
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
