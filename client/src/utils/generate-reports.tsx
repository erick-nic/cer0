import React from 'react';
import style from "../styles/pages/pages.module.css";
import { exportToExcel } from './export-to-excel';
import { pageBack } from './handlers';
import useFetchData from '../hooks/useFetchData';
import { Button } from '../components/labels';

interface FetchOptions extends RequestInit { }

interface ReportProps<T> {
    endpoint: { url: string; options?: FetchOptions };
    columns: string[];
    mapDataToRow: (item: T) => React.ReactNode;
    fileName: string;
}

const Report = <T,>({ endpoint: { url, options }, columns, mapDataToRow, fileName }: ReportProps<T>) => {
    const { data, loading, error } = useFetchData<T[]>(url, options);

    const handleExport = () => {
        if (data) {
            exportToExcel(data, fileName);
        }
    };

    return (
        <div className={style[ 'pages' ]}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <Button value="Back" onClick={pageBack} />
            <Button value="Export" onClick={handleExport} />
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