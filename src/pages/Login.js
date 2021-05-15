import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Login.css';
import {useHistory} from "react-router-dom";
import apiAxios from "../apiAxios";

const Login = () => {
    const [user, setUser] = useState({
        name: '', department: '', phoneNumber: '', role: '', email: ''
    });
    const [info, setInfo] = useState({
        id: '',
        password: ''
    });

    const {id, password} = info;
    const history = useHistory();

    //functions
    const onChange = e => {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    function validateUser(data) {
        console.log("vlidate");
        if (data) {
            setUser(
                {
                    name: data.name,
                    department: data.department,
                    phoneNumber: data.phoneNumber,
                    role: data.role,
                    email: data.email
                }
            )
            history.replace("/");
        } else {
            alert("아이디 혹은 비밀번호가 잘못되었습니다!");
            setInfo({
                id: '',
                password: ''
            })
        }
    }
    const login = () => {
        apiAxios('employee/login', validateUser, info)
    };
    const logout = () => setUser(null);
    return (
        <div className="wrap">
            <div className="panel left-side">
                <div className="left-logo">
                </div>
            </div>
            <div className="panel right-side">
                <div className="login-container">
                    <div className="right-title">
                        <label>HM 손해보험</label>
                        <h3>보험 정보 시스템</h3>
                    </div>
                    <div className="login-div">
                        <div className="square-box">
                            <div className="square-img">
                                <div className="id-img"></div>
                            </div>
                            <input onChange={onChange} value={id} name="id" className="id-input" type="text" id="userid"
                                   placeholder="ID"></input>
                        </div>
                        <div className="square-box">
                            <div className="square-img">
                                <div className="pass-img"></div>
                            </div>
                            <input onChange={onChange} value={password} name="password" className="pass-input"
                                   type="password" id="password" placeholder="Password"></input>
                        </div>
                        <button onClick={login} className="square" id="login">로그인</button>
                    </div>
                    <div>
                        <a id="forget-pass">비밀번호를 잊으셨습니까?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;