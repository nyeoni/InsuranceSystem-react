import React from "react";
import '../css/Base.scss';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";

const Base = () => {
    return (
        <>
            <div className="userbar shadow-sm">
                <div className="left-logo"></div>
            </div>
            <section className="app">
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        <ul>
                            <li>
                                <a href="/home"><i></i><span>홈</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="/home/board"><i></i>공지사항</a>
                                    </li>
                                    <li>
                                        <a href="/home/department"><i></i>부서소개</a>
                                    </li>
                                    <li>
                                        <a href="/home/hminsu"><i></i>회사소개</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/rd"><i></i><span>상품개발</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="/rd/create"><i></i>상품개발</a>
                                    </li>
                                    <li>
                                        <a href="/rd/support"><i></i>상품지원</a>
                                    </li>
                                    <li>
                                        <a href="/rd/manage"><i></i>상품관리</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/sales"><i></i> <span className="">영업관리</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="/sales/contract"><i></i>계약관리</a>
                                    </li>
                                    <li>
                                        <a href="/sales/client"><i></i>고객관리</a>
                                    </li>
                                    <li>
                                        <a href="/sales/apply"><i></i>상품가입</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/uw"><i></i> <span className="">UW</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="/uw/underwriting"><i></i>인수심사</a>
                                    </li>
                                    <li>
                                        <a href="/uw/policy"><i></i>인수정책</a>
                                    </li>
                                    <li>
                                        <a href="/uw/lossmanage"><i></i>손해율관리</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i> <span
                                    className="">보상지원</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i></i>사고접수</a>
                                    </li>
                                    <li>
                                        <a href="#"><i></i>보상처리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i></i>협력업체관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i></i>보상평가관</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i> <span
                                    className="">통합관리</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i></i>수금관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i></i>만기계약관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i></i>제지급관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i></i>부활관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i></i>배서관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i></i>관리지침수</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="tmp">
                </div>
            </section>
        </>
    );
};

export default Base;