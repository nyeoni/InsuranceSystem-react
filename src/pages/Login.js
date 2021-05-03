import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Login.css';

function Login({id, password, onChange, login}){
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
                                <input onChange={onChange} value={id} name="id" className="id-input" type="text" id="userid" placeholder="ID"></input>
                            </div>
                            <div className="square-box">
                                <div className="square-img">
                                    <div className="pass-img"></div>
                                </div>
                                <input onChange={onChange} value={password} name="password" className="pass-input" type="password" id="password" placeholder="Password"></input>
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