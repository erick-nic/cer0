import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = <T>(data: T[], fileName: string = 'export') => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error("No data available to export.");
        return;
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: [ 'data' ] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blobData = new Blob([ excelBuffer ], { type: fileType });
    saveAs(blobData, `${fileName}${fileExtension}`);
};

export {
    exportToExcel
};