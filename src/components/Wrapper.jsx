import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 95%;
`;

const Content = styled.div`
  width: 90%;
  height: 90%;
  margin: auto;
`;

const Title = styled.h3`
    font-family: 'NanumSquare','Noto Sans KR', sans-serif;
    font-weight: bold;
    text-align: left;
    margin-left: 20px;
    margin-top: 40px;
`;

export const Wrapper = (props) => {
    return(
        <Container>
            <Content>
                {props.title ? <Title>{props.title}</Title> : <></>}
                {props.underline || false ? <hr/> : <div></div>}
                {props.children}
            </Content>
        </Container>
    )
}