import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Badge, Descriptions, Spin, Divider} from "antd";
import styled from "styled-components";

const SubTitle = ({text}) => {
    return (
        <h4 style={{fontSize: '16px', color: '#002967'}}>
            <span>•  {text}</span>
        </h4>
    );
}

async function getInsurance(id) {
    const response = await axios.get(
        `https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/newinsurance/${id}`
    );
    return response.data;
}
const SupportDetail = ({match}) => {
    const { id } = match.params;
    const [skip, setSkip] = useState(false);
    const [newData, setNewData] = useState({
        id: '',
        name: '',
        description: '',
        category: '',
        target: {creditRating: '', startAge: '', endAge: ''},
        liablityCoverages: [],
        accidentDocuments: [],
        createTime: '',
        modifiedTime: '',
        createEmployee: {
            id: '',
            name: '',
            phoneNumber: '',
            email: '',
            department: '',
            role: ''
        },
        managementEmployee: {
            id: '',
            name: '',
            phoneNumber: '',
            email: '',
            department: '',
            role: ''
        },
        contractList: []
    });
    const [state] = useAsync(() => getInsurance(id), setNewData,[id], skip);
    const { loading, data: insurance, error } = state;

    if (error) return <div>에러가 발생했습니다</div>;
    if (!insurance || loading) {
        return(
            <Wrapper>
                <Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/>
            </Wrapper>
        );
    }
    return (
        <Wrapper title={newData.name} underline={true}>
            <SubTitle text="상품개요" />
            <Descriptions bordered>
                <Descriptions.Item label="상품명" span={2}>{newData.name}</Descriptions.Item>
                <Descriptions.Item label="보험분류">{newData.category}</Descriptions.Item>
                <Descriptions.Item label="가입최소나이">{newData.target.startAge}세</Descriptions.Item>
                <Descriptions.Item label="가입최대나이">{newData.target.endAge}세</Descriptions.Item>
                <Descriptions.Item label="최소신용등급">{newData.target.creditRating}</Descriptions.Item>
                <Descriptions.Item label="보험상태" span={3}>
                    <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="보상범위" span={3}>
                    {newData.liablityCoverages.map((data, i) =>
                        <span>{data} <Divider type="vertical" /></span>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="사고시 제출서류" span={3}>
                    {newData.accidentDocuments.map((data, i) =>
                        <span>{data} <Divider type="vertical" /></span>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="상품개발사원">{newData.createEmployee.name}</Descriptions.Item>
                <Descriptions.Item label="EMAIL">{newData.createEmployee.email}</Descriptions.Item>
                <Descriptions.Item label="전화번호">{newData.createEmployee.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="상품관리사원">{newData.managementEmployee.name}</Descriptions.Item>
                <Descriptions.Item label="EMAIL">{newData.managementEmployee.email}</Descriptions.Item>
                <Descriptions.Item label="전화번호">{newData.managementEmployee.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="보험설명" span={3}>
                    {newData.description}
                </Descriptions.Item>
            </Descriptions>
        </Wrapper>
    );
}

export default SupportDetail;