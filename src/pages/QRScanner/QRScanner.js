// QRScanner.js
import React, { useState } from 'react';
import './QRScanner.scss';
import QrReader from 'react-qr-scanner';
import { rtdb } from '../firebase';
import { get, ref } from 'firebase/database';

const QRScanner = () => {
    const [userdata, setUserData] = useState({});
    const [paystate, setPaystate] = useState(null);

    const handleScan = (data) => {
        if (data) {
            const parsed = JSON.parse(data.text); // 將掃描到的內容轉成物件
            const scannedId = parsed.id;
            // const scannedId = data.text;
            console.log(parsed)
            setUserData(parsed);

            // 檢查當月繳費記錄
            const currentMonth = new Date().toJSON().slice(0, 7);
            const payRef = ref(rtdb, `Users/${scannedId}/payrecord/${currentMonth}`);
            get(payRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setPaystate(snapshot.val().month); // 或 true
                } else {
                    setPaystate(null);
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    const handleError = (err) => {
        console.error('this is an error', err);
    };

    return (
        <div className='QRScannerContainer'>
            <div className="QRScanner">
                <h3>簽到簽退系統</h3>
                <div className='qrreadercontainer'>
                    <QrReader
                        delay={500}
                        style={{
                            height: 256,
                            width: 256,
                        }}
                        onError={handleError}
                        onScan={handleScan}
                        constraints={{
                            video: { facingMode: 'environment' } // ✅ 後鏡頭
                        }}
                    />
                </div>
                <div className='qrinfocontainer'>
                    <div className='qrinfolabel'>當月是否繳費 : </div>
                    <div className='qrinfospan'>
                        {
                            paystate ?
                                <span className='primary-btn' disabled>已繳費</span> :
                                <span className='primary-btn'>去繳費</span>
                        }
                    </div>
                </div>
                <div className='qrinfocontainer'>
                    <div className='qrinfolabel'>會員姓名 : </div>
                    <div className='qrinfospan'>
                        {userdata.name || '無資料'}
                    </div>
                </div>
                <div className='qrinfocontainer'>
                    <div className='qrinfolabel'>家長電話 : </div>
                    <div className='qrinfospan'>
                        {"0" + userdata.parentPhone || '無資料'}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default QRScanner;
