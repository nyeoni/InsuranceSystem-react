import React, { useState, useEffect } from "react";
import { Wrapper } from "../../components/Wrapper";
import { useSelector } from "react-redux";
import { Carousel, Typography } from "antd";
import Calendar from "../../components/Calendar";
import MyCalendar from "../../components/Calendar";
import { Link } from "react-router-dom";
import img from "../../images/company.jpeg";
import {
  HomeWrapper,
  Welcome,
  LargeContainer,
  SmallContainer,
  Plus,
} from "./style";
import moment from "moment";

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "년 " + month + "월 " + day + "일 ";
}

const Home = () => {
  let timer = null;
  const [time, setTime] = useState(moment());

  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const username = useSelector((state) => state.user.data.name);
  return (
    <HomeWrapper>
      <Welcome>
        <div>Welcome, {username}님 !</div>
        <span>{time.format("YYYY-MM-DD")}</span>
      </Welcome>
      <LargeContainer>
        <SmallContainer>
          <MyCalendar />
        </SmallContainer>
        <SmallContainer>
          <Typography.Title
            style={{ fontFamily: "'NanumSquare','Noto Sans KR', sans-serif" }}
            level={4}
          >
            공지사항{" "}
            <Plus>
              <Link to="/board">더보기</Link>
            </Plus>
          </Typography.Title>
          <hr />
        </SmallContainer>
        <SmallContainer>
          <Typography.Title
            style={{ fontFamily: "'NanumSquare','Noto Sans KR', sans-serif" }}
            level={4}
          >
            공지사항{" "}
            <Plus>
              <Link to="/board">더보기</Link>
            </Plus>
          </Typography.Title>
          <hr />
        </SmallContainer>
      </LargeContainer>
    </HomeWrapper>
  );
};
export default Home;
