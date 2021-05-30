import React from "react";
import {Wrapper} from "../../components/Wrapper";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Carousel, Typography} from "antd";
import Calendar from "../../components/Calendar";
import MyCalendar from "../../components/Calendar";
import {Link} from "react-router-dom";
import img from "../../images/company.jpeg";


const HomeWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
`
const Welcome = styled.div`
    font-family: 'NanumSquare','Noto Sans KR', sans-serif;
    font-size: 20px;
    height: 300px;
    width: 97%;
    border-radius: 1em;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    padding: 1rem 2rem;
    background: linear-gradient(
            to right,
            rgba(225, 225, 225, 1) 10%,
            rgba(225, 225, 225, 1) 50%,
            rgba(225, 225, 225, 0.5) 55%,
            rgba(225, 225, 225, 0.2) 60%,
            rgba(20, 20, 20, 0.1) 65%,
            rgba(20, 20, 20, 0.2) 70%,
            rgba(20, 20, 20, 0.5) 75%,
            rgba(20, 20, 20, 0.65) 100%
          ), url(${img}) no-repeat right;
    background-position: 100% 30%;
`

const LargeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 10px auto;
    margin-bottom: 20px;
    @media (max-width:1200px) {
        flex-wrap: wrap;
        flex-direction: column;
    }
`

const SmallContainer = styled.div`
    width: 30%;
    min-width: 280px;
    height: 400px;
    border-radius: 1em;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
    padding-top: 10px;
    padding-right: 3px;
    padding-left: 3px;
`

const Plus = styled.span`
   font-family: 'Noto Sans KR', sans-serif;
   font-size: 13px;
   font-weight: normal;
`

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Home = () => {
    // const userName = useSelector(state => (state.user.data.name));
    return (
        <HomeWrapper>
            <LargeContainer>
                <Welcome>
                    Welcome, 김나연님 !
                </Welcome>
            </LargeContainer>

            <LargeContainer>
                <SmallContainer>
                    <MyCalendar/>
                </SmallContainer>
                <SmallContainer>
                    <Typography.Title style={{fontFamily: "'NanumSquare','Noto Sans KR', sans-serif"}} level={4}>공지사항 <Plus><Link to="/board">더보기</Link></Plus></Typography.Title>
                    <hr/>
                </SmallContainer>
                <SmallContainer>
                    <Typography.Title style={{fontFamily: "'NanumSquare','Noto Sans KR', sans-serif"}} level={4}>공지사항 <Plus><Link to="/board">더보기</Link></Plus></Typography.Title>
                    <hr/>
                </SmallContainer>
            </LargeContainer>


        </HomeWrapper>
    )
}

export default Home;