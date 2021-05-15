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
                                <Link style={{ textDecoration: 'none' }} to="/home"><i></i><span>홈</span></Link>
                                <ul className="nav-flyout">
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/home/board"><i></i>공지사항</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/home/department"><i></i>부서소개</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/home/hminsu"><i></i>회사소개</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link style={{ textDecoration: 'none' }} to="/rd"><i></i><span>상품개발</span></Link>
                                <ul className="nav-flyout">
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/rd/create"><i></i>상품개발</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/rd/support"><i></i>상품지원</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/rd/manage"><i></i>상품관리</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link style={{ textDecoration: 'none' }} to="/sales"><i></i> <span className="">영업관리</span></Link>
                                <ul className="nav-flyout">
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/sales/contract"><i></i>계약관리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/sales/client"><i></i>고객관리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/sales/apply"><i></i>상품가입</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link style={{ textDecoration: 'none' }} to="/uw"><i></i> <span className="">UW</span></Link>
                                <ul className="nav-flyout">
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/uw/underwriting"><i></i>인수심사</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/uw/policy"><i></i>인수정책</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="/uw/lossmanage"><i></i>손해율관리</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link style={{ textDecoration: 'none' }} to="#"><i></i> <span className="">보상지원</span></Link>
                                <ul className="nav-flyout">
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>사고접수</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>보상처리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>협력업체관리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>보상평가관</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link style={{ textDecoration: 'none' }} to="#"><i></i> <span
                                    className="">통합관리</span></Link>
                                <ul className="nav-flyout">
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>수금관리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>만기계약관리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>제지급관리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>부활관리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>배서관리</Link>
                                    </li>
                                    <li>
                                        <Link style={{ textDecoration: 'none' }} to="#"><i></i>관리지침수</Link>
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