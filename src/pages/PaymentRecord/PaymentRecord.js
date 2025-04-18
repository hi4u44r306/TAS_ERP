import React from 'react'
import './PaymentRecord.scss'
import { rtdb } from "../firebase";
import CollapsibleTable from './CollapsibleTable';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, get, child } from 'firebase/database';


class PaymentRecord extends React.Component {
    constructor() {
        super();
        this.state = {
            paymentrecord: null,
            open: true,
        }

        this.toggle = this.toggle.bind(this);

    }

    componentDidMount() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            const dbRef = ref(rtdb); // 指向整個 DB
            get(child(dbRef, `Users/${user.uid}/payrecord`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = [];
                    snapshot.forEach((doc) => {
                        data.push(doc.val());
                    });
                    this.setState({ paymentrecord: data });
                } else {
                    console.log('no data');
                }
            }).catch((error) => {
                console.error(error);
            });

        });
    }

    toggle = () => {

        this.setState({ open: !this.state.open });
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
                    {/* <table>
                        <thead>
                            <tr className='titlepart'>
                                <th className='title'>月份</th>
                                <th className='title'>繳費狀態</th>
                                <th className='title'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.paymentrecord && this.state.paymentrecord.map((record, index) => (
                                    <React.Fragment>
                                        <tr key={index}>
                                            <td key={record.month}>
                                                <div className='recordcontainer'>
                                                    <div className="spancontainer">
                                                        <span className='month'>{record.month}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td key={record.paystate}>
                                                <div className='recordcontainer'>
                                                    <div className="spancontainer">
                                                        {
                                                            record.paystate ?
                                                                <span
                                                                    key={record.paystate}
                                                                    className='text-success fw-7'>{record.paystate}</span>
                                                                :
                                                                <button className='paybtn'>去繳費</button>
                                                        }

                                                    </div>
                                                </div>
                                            </td>
                                            <td key={index}>
                                                <button onClick={this.toggle(record.paystate)} className='btn-primary'>
                                                    明細...
                                                </button>

                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            }
                        </tbody>
                    </table> */}
                    <CollapsibleTable />
                </div>
            </>
        )
    }
}

export default PaymentRecord