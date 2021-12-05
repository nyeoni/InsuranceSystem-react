import React from "react";
import {Wrapper} from "../../components/Wrapper";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Carousel, Typography, List} from "antd";
import Calendar from "../../components/Calendar";
import MyCalendar from "../../components/Calendar";
import {Link} from "react-router-dom";
import img from "../../images/company.jpeg";

const HomeWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
    align: center;
    background-color: rgba(0, 0, 0, 0.075);
`
const Welcome = styled.div`
    font-family: 'NanumSquare','Noto Sans KR', sans-serif;
    font-size: 20px;
    width: 97%;
    height: 300px;
    border-radius: 1em;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    margin: 0 auto;
    padding: 1rem 2rem;
    background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 10%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 1) 55%,
            rgba(255, 255, 255, 0.9) 60%,
            rgba(255, 255, 255, 0.8) 60%,
            rgba(255, 255, 255, 0.7) 61%,
            rgba(255, 255, 255, 0.6) 63%,
            rgba(255, 255, 255, 0.5) 65%,
            rgba(255, 255, 255, 0.4) 68%,
            rgba(255, 255, 255, 0.3) 70%,
            rgba(255, 255, 255, 0.2) 73%,
            rgba(255, 255, 255, 0.1) 75%,
            rgba(255, 255, 255, 0) 100%
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
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    padding-top: 10px;
    padding-right: 3px;
    padding-left: 3px;
    background-color: white;
`
const MiddleContainer = styled(SmallContainer)`
    width: 60%;
    padding-left: 15px;
    padding-right: 15px;
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
    const username = useSelector(state => (state.user.data.name));
    const listItems=['dddd','aaaa']
    return (
        <HomeWrapper>
            <Welcome>
                Welcome, {username}님 !
            </Welcome>
            <LargeContainer>
                <SmallContainer>
                    <MyCalendar/>
                </SmallContainer>
                <MiddleContainer>
                    <Typography.Title level={4} style={{fontFamily: "'NanumSquare','Noto Sans KR', sans-serif"}}> 공지사항 <Plus><Link to="/board">더보기</Link></Plus></Typography.Title>
                    <hr/>
                    <List
                        dataSource={listItems}
                        renderItem={item => <List.Item>{item}</List.Item>}/>
                </MiddleContainer>
            </LargeContainer>
        </HomeWrapper>
    )
}

export default Home;
