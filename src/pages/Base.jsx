import React from "react";
import '../css/Base.scss';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

const Base = () => {
    return (
        <>
            <section className="app">
                <aside className="sidebar">
                    <header>
                        Menu
                    </header>
                    <nav className="sidebar-nav">
                        <ul>
                            <li>
                                <a href="#"><i className="ion-bag"></i> <span>상품개발</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-color-filter-outline"></i>Derps</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-clock-outline"></i>Times</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-android-star-outline"></i>Hates</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-heart-broken"></i>Beat</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-settings"></i> <span className="">영업관리</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-alarm-outline"></i>Watch</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-camera-outline"></i>Creeper</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-chatboxes-outline"></i>Hate</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-cog-outline"></i>Grinder</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-briefcase-outline"></i> <span
                                    className="">UW</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-flame-outline"></i>Burn</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-lightbulb-outline"></i>Bulbs</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-location-outline"></i>Where You</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-locked-outline"></i>On Lock</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-navigate-outline"></i>Ghostface</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-analytics-outline"></i> <span
                                    className="">보상지원</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-timer-outline"></i>Timers</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-arrow-graph-down-left"></i>You Lose</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-partlysunny-outline"></i>Stormy</a>
                                    </li>
                                    <li>
                                        <a href="#"><i
                                            className="ion-ios-timer-outline">https://codepen.io/StephenScaff/pen/bVbEbJ</i>Lookie
                                            Look</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-game-controller-a-outline"></i>Dork Mfer</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-paper-outline"></i> <span
                                    className="">통합관리</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-filing-outline"></i>File Cab</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-information-outline"></i>Infos</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-paperplane-outline"></i>Planes</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-android-star-outline"></i>Shop</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-navigate-outline"></i> <span
                                    className="">Ass Finder</span></a>
                                <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-flame-outline"></i>Burn</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-lightbulb-outline"></i>Bulbs</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-location-outline"></i>Where You</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-locked-outline"></i>On Lock</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-navigate-outline"></i>Ghostface</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="ion-ios-medical-outline"></i> <span
                                    className="">Cocaine</span></a>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </section>
        </>
    );
}

export default Base;