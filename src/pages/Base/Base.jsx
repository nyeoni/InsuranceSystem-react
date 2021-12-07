import React, { useEffect } from "react";
import "../../css/Base.scss";
import { Link, Outlet } from "react-router-dom";
import { MyLink } from "../../components/MyLink";
import { AccountCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Base = ({ children }) => {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const cookies = new Cookies();
  //     const token = cookies.get("token");
  //     const authenticated = token ? true : false;
  //     if (!authenticated) navigate("/login");
  //   }, [navigate]);

  return (
    <>
      <div className="userbar shadow-sm">
        <Link to="/">
          <div className="left-logo"></div>
        </Link>

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
                <MyLink to="/">
                  <span>HOME</span>
                </MyLink>
              </li>
              <li>
                <MyLink to="/board">
                  <span>공지사항</span>
                </MyLink>
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
              <li>
                <MyLink to="/uw/underwriting">인수심사</MyLink>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="router">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Base;
