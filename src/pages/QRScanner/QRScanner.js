// QRScanner.js
import React, { useState } from 'react';
import './QRScanner.scss';
import QrReader from 'react-qr-scanner'
import firebase from '../firebase'

const QRScanner = () => {
    const [username, setUserName] = useState();
    const [userid, setUserId] = useState();
    // const [paymentrecord, setPaymentrecord] = useState(null);
    // const currentMonth = new Date().toJSON().slice(0, 7);


    const handleScan = (data) => {
        if (data) {
            //讀取QR Code 取得用戶ID
            setUserId(data.text)
            // firebase.database().ref('Users/' + userid + 'payrecord/').get().then((snapshot) => {
            //     if (snapshot.exists()) {
            //         console.log(JSON.stringify(snapshot.val().currentMonth.paystate))
            //     } else {

            //     }
            // }).catch((error) => {
            //     console.error(error);
            // });
        }
    };
    firebase.database().ref('Users/' + userid).get().then((snapshot) => {
        if (snapshot.exists()) {
            setUserName(snapshot.val().studentname)
            console.log(snapshot.val().payrecord.currentMonth.paystate)
        } else {
            console.log('No snapshot found')
        }
    }).catch((error) => {
        console.error(error);
    });


    const handleError = (err) => {
        console.error('this is an error', err);
    };


    return (
        <>
            <div className="qr-reader">
                <h3>會員掃描</h3>
                <QrReader
                    delay={500}
                    style={{
                        height: 256,
                        width: 256,
                    }}
                    onError={handleError}
                    onScan={handleScan}
                />

                {/* <p className="infocontainer">當月是否繳費: {paymentrecord || '無資料'}</p> */}
                <p className="infocontainer">會員編號: {userid || '無資料'}</p>
                <p className="infocontainer">會員姓名: {username || '無資料'}</p>
            </div>
        </>
    );
};

export default QRScanner;
