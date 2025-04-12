import React from 'react'
// import { Link } from 'react-router-dom'
import './Edit.scss'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import { rtdb } from "../firebase";
import { ref, get, update } from "firebase/database"; // Modular 函式


class Edit extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            loading: true,
            studentname: "",
            parentsname: "",
            phonenumber: "",
        }
    }
    useruid = localStorage.getItem('useruid');
    userRef = ref(rtdb, `Users/${this.useruid}`);

    componentDidMount() {
        get(this.userRef).then((snapshot) => {
            this.setState({ ...snapshot.val() })
        }).catch(() => {
            this.setState({})
        });
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    success = () => {
        toast.success('修改成功', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => { window.location.href = "/login"; }, 1000)
    };

    error = () => {
        toast.error('帳號密碼錯誤', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    update = () => {
        update(this.userRef, {
            studentname: this.state.studentname,
            parentsname: this.state.parentsname,
            phonenumber: this.state.phonenumber,
        })
            .then(() => {
                localStorage.setItem("studentname", this.state.studentname);
                localStorage.setItem("parentsname", this.state.parentsname);
                localStorage.setItem('phonenumber', this.state.phonenumber);
                this.success();
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            })
            .catch(() => {
                this.error();
            });

    }

    cancel = () => {
        window.location.href = "/"
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className='Editcontainer'>
                <ToastContainer />
                <div className='Loginform'>
                    <div className='Logininputcontainer'>
                        <label>家長名稱 / Parents Name</label>
                        {
                            this.state.loading ?
                                <ScaleLoader
                                    loading={this.loading}
                                    color="hsla(209, 100%, 69%, 1)"
                                    height={25}
                                />
                                :
                                <input name='parentsname' value={this.state.parentsname} onChange={this.handleChange} />
                        }
                    </div>
                    <div className='Logininputcontainer'>
                        <label>學生名稱 / Student Name</label>
                        {
                            this.state.loading ?
                                <ScaleLoader
                                    loading={this.loading}
                                    color="hsla(209, 100%, 69%, 1)"
                                    height={25}
                                />
                                :
                                <input name='studentname' value={this.state.studentname} onChange={this.handleChange} />
                        }
                    </div>
                    <div className='Logininputcontainer'>
                        <label>電話號碼 / Phonenumber</label>
                        {
                            this.state.loading ?
                                <ScaleLoader
                                    loading={this.loading}
                                    color="hsla(209, 100%, 69%, 1)"
                                    height={25}
                                />
                                :
                                <input name='phonenumber' pattern="[0-9]{4}[0-9]{3}[0-9]{3}" maxLength={10} value={this.state.phonenumber} onChange={this.handleChange} />
                        }

                    </div>
                    <div className='Loginbtn'>
                        <button className="btn-primary"
                            onClick={this.update}
                            type="submit">更新資料</button>
                    </div>
                    <div className='Loginbtn'>
                        <button className="btn-danger"
                            onClick={this.cancel}
                            type="submit">取消</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;
