import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Login.css';
import {message} from "antd";
import {Link, useHistory} from "react-router-dom";
import apiAxios from "../../apiAxios";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import SignUp from "./SignUp";


const Login = ({onSetUser}) => {
    //state & variables
    const [info, setInfo] = useState({
        loginId: '',
        password: ''
    });
    const {loginId, password} = info;

    const [visible, setVisible] = useState(false);
    const history = useHistory();

    //functions
    const onChange = e => {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };
    async function getUser(info) {
        const response = await axios(
            {
                url: '/login',
                method: 'post',
                data: {
                    loginId: info.loginId,
                    password: info.password
                },
                withCredentials: true
            }
        )
        return response.data;
    }
    const login = async () => {
        try {
            const data = await getUser(info);
            console.log("login method");
            onSetUser(data);
            history.replace("/");
        } catch (error) {
            console.log('error', error.response);
            onSetUser({
                status: 500,
                data: null,
                result: 'FAIL'
            })
            message.error(error.message);
            // alert("아이디 혹은 비밀번호를 잘못입력하셨습니다.");
            setInfo({
                loginId: '',
                password: ''
            })
        }
    };
    const logout = () => onSetUser({
        status: false,
        data: null,
        result: null
    });

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
                            <input onChange={onChange} value={loginId} name="loginId" className="id-input" type="text" id="userid"
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
                        <Link className="forget-pass" to="/login/forget">비밀번호를 잊으셨습니까?</Link>
                    </div>
                    <div>
                        <a className="forget-pass" onClick={() => {setVisible(true)}}>회원가입</a>
                    </div>
                        <SignUp visible = {visible} setVisible = {setVisible}/>
                </div>
            </div>
        </div>
    );
}

export default Login;
