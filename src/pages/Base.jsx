import React from "react";
import '../css/Base.scss';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

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
                                <a href="/home"><i className="ion-bag"></i><span>홈</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="/home/board"><i className="ion-ios-color-filter-outline"></i>공지사항</a>
                                    </li>
                                    <li>
                                        <a href="/home/department"><i className="ion-ios-clock-outline"></i>부서소개</a>
                                    </li>
                                    <li>
                                        <a  href="/home/hminsu"><i className="ion-android-star-outline"></i>회사소개</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/rd"><i className="ion-bag"></i><span>상품개발</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="/rd/create"><i className="ion-ios-color-filter-outline"></i>상품개발</a>
                                    </li>
                                    <li>
                                        <a href="/rd/support"><i className="ion-ios-clock-outline"></i>상품지원</a>
                                    </li>
                                    <li>
                                        <a href="/rd/manage"><i className="ion-android-star-outline"></i>상품관리</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/sales"><i className="ion-ios-settings"></i> <span className="">영업관리</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="/sales/contract"><i className="ion-ios-alarm-outline"></i>계약관리</a>
                                    </li>
                                    <li>
                                        <a href="/sales/client"><i className="ion-ios-camera-outline"></i>고객관리</a>
                                    </li>
                                    <li>
                                        <a href="/sales/apply"><i className="ion-ios-chatboxes-outline"></i>상품가입</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/uw"><i className="ion-ios-briefcase-outline"></i> <span className="">UW</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="/uw/underwriting"><i className="ion-ios-flame-outline"></i>인수심사</a>
                                    </li>
                                    <li>
                                        <a href="/uw/policy"><i className="ion-ios-lightbulb-outline"></i>인수정책</a>
                                    </li>
                                    <li>
                                        <a href="/uw/lossmanage"><i className="ion-ios-location-outline"></i>손해율관리</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-analytics-outline"></i> <span
                                    className="">보상지원</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-timer-outline"></i>사고접수</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-arrow-graph-down-left"></i>보상처리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-partlysunny-outline"></i>협력업체관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-timer-outline"></i>보상평가관</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-paper-outline"></i> <span
                                    className="">통합관리</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-filing-outline"></i>수금관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-information-outline"></i>만기계약관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-paperplane-outline"></i>제지급관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-android-star-outline"></i>부활관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-android-star-outline"></i>배서관리</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-android-star-outline"></i>관리지침수</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="tmp">dd</div>
            </section>
        </>
    );
};

export default Base;