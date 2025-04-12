import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';

const QRBatchGenerator = () => {
    const [students, setStudents] = useState([]);
    const qrRefs = useRef({});

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet);

            // 只取 name 與 parentPhone 欄位
            const filtered = json.map((item, index) => ({
                id: `S${index + 1}`.padStart(3, '0'), // 自動編 ID
                name: item.name || '',
                parentPhone: item.parentPhone || '',
            }));

            setStudents(filtered);
        };
        reader.readAsArrayBuffer(file);
    };

    const downloadQR = (student) => {
        const node = qrRefs.current[student.id];
        if (!node) return;
        toPng(node).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `${student.name}_QRCode.png`;
            link.href = dataUrl;
            link.click();
        });
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>批次產生 QR Code（姓名＋家長電話）</h2>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

            {students.length > 0 && (
                <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {students.map((student) => (
                        <div
                            key={student.id}
                            style={{ border: '1px solid #ccc', padding: 10, textAlign: 'center' }}
                        >
                            <div ref={(el) => (qrRefs.current[student.id] = el)}>
                                <QRCodeCanvas
                                    value={JSON.stringify(student)}
                                    size={150}
                                    includeMargin
                                />
                            </div>
                            <p>{student.name}</p>
                            <button onClick={() => downloadQR(student)}>下載 QR Code</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QRBatchGenerator;
