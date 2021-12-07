import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "antd";
import MyCalendar from "../../components/Calendar";
import {
  HomeWrapper,
  Welcome,
  LargeContainer,
  SmallContainer,
  CarouselContainer,
  Plus,
} from "./style";
import insuImg from "../../images/insur2.jpeg";
import moment from "moment";
import "antd/dist/antd.css";

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
      <SmallContainer>
        <MyCalendar />
      </SmallContainer>
    </HomeWrapper>
  );
};
export default Home;
