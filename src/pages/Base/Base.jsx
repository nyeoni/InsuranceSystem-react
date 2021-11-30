import React from "react";
import '../../css/Base.scss';
import {Link} from "react-router-dom";
import HomeRouter from "../Router/HomeRouter";
import RdRouter from "../Router/RdRouter";
import SalesRouter from "../Router/SalesRouter";
import SupportRouter from "../Router/SupportRouter";
import UWRouter from "../Router/UWRouter";
import ManageRouter from "../Router/ManageRouter";
import {MyLink} from "../../components/MyLink";
import {AccountCircle} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Base = () => {
    return (
        <>
            <div className="userbar shadow-sm">
                <Link to="/"><div className="left-logo"></div></Link>

                <IconButton className="user" color="inherit">
                    <AccountCircle />
                </IconButton>

                <IconButton className="user" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <IconButton className="user" color="inherit">
                    <Badge badgeContent={4} color="primary">
                        <MailIcon />
                    </Badge>
                </IconButton>
            </div>
            <section className="app">
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        <ul>
                            <li>
                                <MyLink to="/"><span>HOME</span></MyLink>
                            </li>
                            <li>
                                <MyLink to="/board"><span>공지사항</span></MyLink>
                            </li>
                            <li>
                                <MyLink to="#">상품개발</MyLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <MyLink to="/rd/create">상품개발</MyLink>
                                    </li>
                                    <li>
                                        <MyLink to="/rd/support">상품지원</MyLink>
                                    </li>
                                    <li>
                                        <MyLink to="/rd/manage">상품관리</MyLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <MyLink to="#">영업관리</MyLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <MyLink to="/sales/contract">계약관리</MyLink>
                                    </li>
                                    <li>
                                        <MyLink to="/sales/client">고객관리</MyLink>
                                    </li>
                                    <li>
                                        <MyLink to="/sales/apply">상품가입</MyLink>
                                    </li>
                                    <li>
                                        <MyLink to="/sales/register">고객가입</MyLink>
                                    </li>
                                </ul>
                            </li>
                            {/*<li>*/}
                            {/*    <MyLink to="#">인수심사</MyLink>*/}
                            {/*    <ul className="nav-flyout">*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/uw/underwriting">인수심사</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/uw/policy">인수정책</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/uw/lossmanage">손해율관리</MyLink>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <MyLink to="#">보상지원</MyLink>*/}
                            {/*    <ul className="nav-flyout">*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/support/accident">사고접수</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/support/compensate">보상처리</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/support/cooperation">협력업체관리</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/support/evalution">보상평가관리</MyLink>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <MyLink to="#">통합관리</MyLink>*/}
                            {/*    <ul className="nav-flyout">*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/manage/payment">수금관리</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/manage/expiration">만기계약관리</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/manage/reimbursement">제지급관리</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/manage/termination">부활관리</MyLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <MyLink to="/manage/terms">배서관리</MyLink>*/}
                            {/*        </li>*/}
                            {/*       <li>*/}
                            {/*            <MyLink to="/manage/policy">관리지침수립</MyLink>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
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
