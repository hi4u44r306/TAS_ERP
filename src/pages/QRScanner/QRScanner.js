// QRScanner.js
import React, { useState } from 'react';
import './QRScanner.scss';
import QrReader from 'react-qr-scanner'
import firebase from '../firebase'

const QRScanner = () => {
    const [username, setUserName] = useState();
    const [userid, setUserId] = useState();
    const [paystate, setPaystate] = useState(null);
    // const [facing, setFacing] = useState(false);

    const handleScan = (data) => {
        if (data) {
            //讀取QR Code 取得用戶ID
            setUserId(data.text)
        }
    };
    firebase.database().ref('Users/' + userid).get().then((snapshot) => {
        if (snapshot.exists()) {
            setUserName(snapshot.val().studentname)
        } else {
            console.log('No snapshot found')
        }
    }).catch((error) => {
        console.error(error);
    });

    const currentMonth = new Date().toJSON().slice(0, 7);
    firebase.database().ref('Users/' + userid).child('payrecord/' + currentMonth).get().then((snapshot) => {
        if (snapshot.exists()) {
            setPaystate(snapshot.val().month)
        }
    })

    // const switchcamera = () => {
    //     setFacing(!false)
    // }


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
                    />
                </div>
                <div className='qrinfocontainer'>
                    <div className='qrinfolabel'>當月是否繳費 : </div>
                    <div className='qrinfospan'>
                        {
                            paystate ?
                                <span className='primary-btn' disabled>已繳費</span>
                                :
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
