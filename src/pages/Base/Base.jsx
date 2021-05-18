import React from "react";
import '../../css/Base.scss';
import {Link} from "react-router-dom";
import HomeRouter from "../Router/HomeRouter";
import RdRouter from "../Router/RdRouter";
import SalesRouter from "../Router/SalesRouter";
import SupportRouter from "../Router/SupportRouter";
import UWRouter from "../Router/UWRouter";
import ManageRouter from "../Router/ManageRouter";

const Base = () => {
    const StyledLink = styled(Link)`
        text-decoration: none;
    `
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
                                <StyledLink to="/home"><i></i><span>HOME</span></StyledLink>
                            </li>
                            <li>
                                <StyledLink to="/home/board"><i></i><span>공지사항</span></StyledLink>
                            </li>
                            <li>
                                <StyledLink to="/rd"><i></i><span>상품개발</span></StyledLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <StyledLink to="/rd/create"><i></i>상품개발</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/rd/support"><i></i>상품지원</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/rd/manage"><i></i>상품관리</StyledLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <StyledLink to="/sales"><i></i> <span className="">영업관리</span></StyledLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <StyledLink to="/sales/contract"><i></i>계약관리</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/sales/client"><i></i>고객관리</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/sales/apply"><i></i>상품가입</StyledLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <StyledLink to="/uw"><i></i> <span className="">인수심사</span></StyledLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <StyledLink to="/uw/underwriting"><i></i>인수심사</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/uw/policy"><i></i>인수정책</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/uw/lossmanage"><i></i>손해율관리</StyledLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <StyledLink style={{ textDecoration: 'none' }} to="support"><i></i> <span className="">보상지원</span></StyledLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <StyledLink to="/support/accident"><i></i>사고접수</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/support/compensate"><i></i>보상처리</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/support/cooperation"><i></i>협력업체관리</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/support/evalution"><i></i>보상평가관리</StyledLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <StyledLink to="manage"><i></i> <span
                                    className="">통합관리</span></StyledLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <StyledLink to="/manage/payment"><i></i>수금관리</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/manage/expiration"><i></i>만기계약관리</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/manage/reimbursement"><i></i>제지급관리</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/manage/termination"><i></i>부활관리</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink to="/manage/terms"><i></i>배서관리</StyledLink>
                                    </li>
                                   <li>
                                        <StyledLink to="/manage/policy"><i></i>관리지침수립</StyledLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="router">
                    <HomeRouter />
                    <RdRouter />
                    <SalesRouter />
                    <UWRouter />
                    <SupportRouter />
                    <ManageRouter />
                </div>
            </section>
        </>
    );
};

export default Base;