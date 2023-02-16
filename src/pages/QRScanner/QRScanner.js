// QRScanner.js
import React, { useState } from 'react';
import './QRScanner.scss';
import QrReader from 'react-qr-scanner'
import firebase from '../firebase'

const QRScanner = () => {
    const [username, setUserName] = useState();
    const [userid, setUserId] = useState();
    const [paystate, setPaystate] = useState(null);
    const [facing, setFacing] = useState('rear');

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

    const switchcamera = () => {
        if (facing !== 'rear') {
            setFacing('rear')
        } else {
            setFacing('front')
        }
    }


    const handleError = (err) => {
        console.error('this is an error', err);
    };


    return (
        <>
            <div className="qr-reader">
                <h3>會員掃描</h3>
                <button className='btn-danger' onClick={switchcamera}>Switch Camera</button>
                <QrReader

                    delay={500}
                    style={{
                        height: 256,
                        width: 256,
                    }}
                    facingmode={"user"}
                    onError={handleError}
                    onScan={handleScan}
                />

                <p className="infocontainer">
                    當月是否繳費:
                    {
                        paystate ?
                            <span className='primary-btn' disabled>已繳費</span>
                            :
                            <span className='primary-btn'>去繳費</span>
                    }
                </p>
                <p className="infocontainer">會員編號: {userid || '無資料'}</p>
                <p className="infocontainer">會員姓名: {username || '無資料'}</p>
            </div>
        </>
    );
};

export default QRScanner;
