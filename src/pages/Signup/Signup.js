import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'
import firebase from '../firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';

class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.Signup = this.Signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: "",
            password: "",
            parentsname: "",
            studentname: "",
            phonenumber: "",
        }
    }

    success = () => {
        toast.success('註冊成功', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    error = () => {
        toast.error('帳號已存在', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    empty = () => {
        toast.warn('註冊資訊不完整', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    Signup(e) {
        e.preventDefault();
        const currentDate = new Date().toJSON().slice(0, 10);
        if (this.state.email && this.state.password && this.state.parentsname && this.state.studentname && this.state.phonenumber.trim().length !== 0) {
            try {
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
                    this.success();
                    // 在User中用UserID建立集合
                    firebase.database().ref('Users/' + user.user.uid).set({
                        parentsname: this.state.parentsname,
                        studentname: this.state.studentname,
                        email: this.state.email,
                        password: this.state.password,
                        phonenumber: this.state.phonenumber,
                        accountcreated: currentDate,
                    }).then(() => {
                        // 在UserID集合中創建Payrecord子集合
                        let currentMonth = new Date().getMonth();

                        for (let i = 1; i <= 10; i++) {
                            let monthNumber = (currentMonth + i) % 12;
                            let year = new Date().getFullYear() + Math.floor((currentMonth + i) / 12);

                            let date = new Date(year, monthNumber);

                            let monthName = date.toLocaleString('default', { month: 'long' });

                            const paydate = new Date().getFullYear() + '-' + monthName;

                            firebase.database().ref('Users/' + user.user.uid).child('payrecord/' + new Date().getFullYear()).set({

                            }).then(() => {
                                firebase.database().ref('Users/' + user.user.uid).child('payrecord/' + new Date().getFullYear()).child(i).set({
                                    Detail: [
                                        {
                                            classname: '安親班',
                                            amount: 1,
                                            price: 7300
                                        },
                                        {
                                            classname: '英文班',
                                            amount: 1,
                                            price: 2200
                                        },
                                        {
                                            classname: '羊奶',
                                            amount: 1,
                                            price: 700
                                        }
                                    ],
                                    month: paydate,
                                    paystate: "",
                                })
                                // firebase.database().ref('Users/' + user.user.uid).child('payrecord/' + new Date().getFullYear()).child(i).child('Detail/').set({
                                //     type1: {
                                //         classname: '安親班',
                                //         price: 7300
                                //     },
                                //     type2: {
                                //         classname: '英文班',
                                //         price: 2200
                                //     },
                                //     type3: {
                                //         classname: '羊奶',
                                //         price: 700
                                //     }
                                // })
                            })

                        }
                    });
                    setTimeout(() => { window.location.href = "/"; }, 3000)
                }).catch(() => {
                    this.error();
                })
            } catch (err) {
                this.error(err);
            }
        } else {
            this.empty();
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className='Signupcontainer'>
                <div className='Signupform'>
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        limit={1}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="light"
                    />
                    <div className='text-regal-blue fs-25 fw-7 Signuptitle'>桃園安親班會員註冊</div>
                    <div className='Signupinputcontainer'>
                        <label>帳號 (Email)</label>
                        <input
                            required
                            name="email"
                            type="email"
                            id="email"
                            placeholder="輸入電子郵件或帳號..."
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className='Signupinputcontainer'>
                        <label>密碼</label>
                        <Form.Control
                            required
                            name="password"
                            type="password"
                            id="password"
                            placeholder="輸入密碼..."
                            onChange={this.handleChange}
                            value={this.state.password}

                        />
                    </div>
                    <div className='Signupinputcontainer'>
                        <label>家長姓名(父親或母親)</label>
                        <input
                            required
                            name="parentsname"
                            type="text"
                            id="parentsname"
                            placeholder="姓名..."
                            onChange={this.handleChange}
                            value={this.state.parentsname}
                        />
                    </div>
                    <div className='Signupinputcontainer'>
                        <label>學生姓名</label>
                        <input
                            required
                            name="studentname"
                            type="text"
                            id="studentname"
                            placeholder="姓名..."
                            onChange={this.handleChange}
                            value={this.state.studentname}
                        />
                    </div>
                    <div className='Signupinputcontainer'>
                        <label>電話號碼</label>
                        <input
                            required
                            name="phonenumber"
                            type="tel"
                            id="phonenumber"
                            placeholder='0912 345 678'
                            pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
                            maxLength={10}
                            onChange={this.handleChange}
                            value={this.state.phonenumber}
                        />
                    </div>
                    <div className='Signupbtn'>
                        <button className="btn-primary"
                            onClick={this.Signup}
                            type="submit">註冊</button>
                    </div>

                    <div className='Signupforgotpassword'>
                        <span>已經有帳號了 ? </span><Link to="/login" className='text-red fw-7'>登入</Link>
                    </div>
                </div>
            </div >
        );
    }
}

export default Signup;