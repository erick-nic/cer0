import React from 'react';
import style from "../../../styles/products/reports/to-excel.module.css";
import { exportToExcel } from './export-to-excel';
import { pageBack } from './handlers';
import useFetchData from '../hooks/useFetchData';

interface ReportProps<T> {
    endpoint: string;
    columns: string[];
    mapDataToRow: (item: T) => React.ReactNode;
    fileName: string;
}

const Report = <T,>({ endpoint, columns, mapDataToRow, fileName }: ReportProps<T>) => {
    const { data, loading, error } = useFetchData<T[]>(endpoint);

    const handleExport = () => {
        if (data) {
            exportToExcel(data, fileName);
        }
    };

    return (
        <div className={style['products-reports']}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <button onClick={pageBack}>Back</button>
            <button onClick={handleExport}>Export to XLSX</button>
            {!loading && !error && data && (
                <table>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>{mapDataToRow(item)}</tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Report;