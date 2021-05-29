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
    margin-left: 6px;
    display: inline-block;
    margin-top: 50px;
    margin-bottom: 0;
`;

const Subtitle = styled.h4`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: lighter;
    display: inline-block;
    font-size: 15px;
    text-align: left;
    margin-left: 20px;
    vertical-align: middle;
    margin-bottom : 0;
`;

export const Wrapper = ({title= false, underline = false, children = null, subtitle=false}) => {
    return(
        <Container>
            <Content>
                {title ? <Title>{title}</Title> : <></>}
                {subtitle ? <Subtitle>{subtitle}</Subtitle> : <></>}
                {underline ? <hr /> : null}
                {children}
            </Content>
        </Container>
    )
}