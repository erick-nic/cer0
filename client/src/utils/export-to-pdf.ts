import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generatePDFReport<T extends Record<string, any>>(data: T[], title = "Reporte de Datos") {
    const doc = new jsPDF();

    doc.setFontSize(13);
    doc.text(title, 14, 20);

    if (data.length === 0) {
        doc.text("No hay datos para mostrar.", 14, 30);
    } else {
        const keys = Object.keys(data[ 0 ]);

        const headers = keys.map(key => ({
            content: key,
            styles: { halign: 'center', fillColor: [ 200, 200, 200 ] as [ number, number, number ] }
        }));

        const rows = data.map(item =>
            keys.map(key => String(item[ key ] ?? ''))
        );

        autoTable(doc, {
            startY: 30,
            head: [ headers.map(h => h.content) ],
            body: rows,
            styles: { fontSize: 10 },
            headStyles: {
                fillColor: [ 200, 200, 200 ],
                halign: 'left'
            }
        });
    }

    doc.save(`${title}.pdf`);
}
