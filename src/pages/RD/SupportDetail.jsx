import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {Badge, Descriptions, Spin, Divider, Button, notification} from "antd";

import useAxios from "../../swr/useAxios";

const SubTitle = ({text}) => {
    return (
        <h4 style={{fontSize: '16px', color: '#002967'}}>
            <span>•  {text}</span>
        </h4>
    );
}

const SupportDetail = ({match}) => {
    const { id } = match.params;
    const { data: insurance, isLoading, isError } = useAxios(`/insurance/${id}`, "get");

    //exception
    if (isError) {return <div>에러가 발생하였습니다.</div>;}
    if (isLoading) {return (<Wrapper><Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/></Wrapper>);}

    return (
        <Wrapper title={insurance.name} underline={true}>
            <SubTitle text="상품개요" />
            <Descriptions bordered>
                <Descriptions.Item label="상품명" span={2}>{insurance.name}</Descriptions.Item>
                <Descriptions.Item label="보험분류">{insurance.category}</Descriptions.Item>
                <Descriptions.Item label="가입최소나이">{insurance.conditions?.startAge}세</Descriptions.Item>
                <Descriptions.Item label="가입최대나이">{insurance.conditions?.endAge}세</Descriptions.Item>
                <Descriptions.Item label="최소신용등급">{insurance.conditions?.rating}등급</Descriptions.Item>
                <Descriptions.Item label="보험상태" span={3}>
                    <Badge status="processing" text="상품 운영중" />
                </Descriptions.Item>
                <Descriptions.Item label="보험설명" span={3}>
                    {insurance.description}
                </Descriptions.Item>
            </Descriptions>
        </Wrapper>
    );

}

export default SupportDetail;
