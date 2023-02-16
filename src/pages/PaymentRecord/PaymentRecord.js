import React from 'react'
import 'PaymentRecord.scss'
import firebase from "../firebase";

class PaymentRecord extends React.Component {
    state = {
        paymentrecord: null,
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const db = firebase.firestore();
                db.collection('users').doc(user.uid).collection('Paymentrecord').get().then((snapshot) => {
                    const data = [];
                    snapshot.forEach((doc) => {
                        data.push(doc.data())
                    })
                    this.setState({ paymentrecord: data });
                }).catch((err) => {
                    console.log(err);
                })
            } else {
            }
        });
    }

    render() {
        return (
            <>
                <div className='recordbox'>
                    <div className='boxtitle'>
                        <h3>
                            繳費紀錄
                        </h3>
                    </div>
                    <table>
                        <thead>
                            <tr className='titlepart'>
                                <th className='title'>月份</th>
                                <th className='title'>繳費狀態</th>
                                <th className='title'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.paymentrecord && this.state.paymentrecord.map((record, index) => {
                                    return (
                                        <tr key={index}>
                                            <td key={record.月份}>
                                                <div className='d-flex justify-content-center'>
                                                    <div className="align-self-center pl-3">
                                                        <b><span className='font-weight-bold'>{record.月份}</span></b>
                                                    </div>
                                                </div>
                                            </td>
                                            <td key={record.繳費紀錄}>
                                                <div className='d-flex justify-content-center'>
                                                    <div className="align-self-center pl-3">
                                                        <b><span className={record.繳費紀錄 ? 'text-success' || '' : 'text-danger'}>{record.繳費紀錄 || '未繳費'}</span></b>
                                                    </div>
                                                </div>
                                            </td>
                                            <td key={index}>
                                                <div className='d-flex justify-content-center'>
                                                    <div className="align-self-center pl-3">
                                                        {
                                                            record.繳費紀錄 ?
                                                                <button className='alreadypaybtn' disabled>已繳費</button>
                                                                :
                                                                <button className='paybtn'>去繳費</button>
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}

export default PaymentRecord