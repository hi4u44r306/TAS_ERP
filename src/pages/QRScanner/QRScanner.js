// QRScanner.js
import React, { useState } from 'react';
import './QRScanner.scss';
import QrReader from 'react-qr-scanner';
import { rtdb } from '../firebase';
import { get, ref } from 'firebase/database';

const QRScanner = () => {
    const [username, setUserName] = useState();
    const [userid, setUserId] = useState();
    const [paystate, setPaystate] = useState(null);

    const handleScan = (data) => {
        if (data && data.text !== userid) {
            const scannedId = data.text;
            setUserId(scannedId);

            // 讀取用戶基本資料
            const userRef = ref(rtdb, 'Users/' + scannedId);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setUserName(snapshot.val().studentname);
                } else {
                    setUserName('找不到會員');
                }
            }).catch((error) => {
                console.error(error);
            });

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
                <h3>會員掃描</h3>
                <div className='qrreadercontainer'>
                    <QrReader
                        delay={1000}
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
                    <div className='qrinfolabel'>會員編號 : </div>
                    <div className='qrinfospan'>
                        {userid || '無資料'}
                    </div>
                </div>
                <div className='qrinfocontainer'>
                    <div className='qrinfolabel'>會員姓名 : </div>
                    <div className='qrinfospan'>
                        {username || '無資料'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRScanner;
