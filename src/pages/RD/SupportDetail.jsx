import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Badge, Descriptions, Spin, Divider, Button, notification} from "antd";
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
        `http://hminsu.net/api/insurance/${id}`
    );
    return response.data.data;
}
async function statusInsurance(id, data) {
    console.log('status on api call ',data.status)
    const url = `https://hminsu.net/api/insurance/${id}/status`;
    const response = await axios({
        method: 'post',
        url: url,
        data: { status : data.status },
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        notification.open({
            message: 'Notification!',
            description: '보험상태 정보 전송 완료'
        })
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    return response;
}

const SupportDetail = ({match}) => {
    const { id } = match.params;
    const [skip, setSkip] = useState(false);
    const [newData, setNewData] = useState({
        id: '',
        name: '',
        description: '',
        category: '',
        status: '',
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
    useEffect(()=> {console.log(newData)},[newData])

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
    function onClick() {
        setNewData({...newData, status: '결재완료'});
        const data = statusInsurance(id, newData);
        console.log('data after api call', data)
    }

    if(newData){
        return (
            <Wrapper title={newData.name} underline={true}>
                <SubTitle text="상품개요" />
                <Descriptions bordered>
                    <Descriptions.Item label="상품명" span={2}>{newData.name}</Descriptions.Item>
                    <Descriptions.Item label="보험분류">{newData.category}</Descriptions.Item>
                    <Descriptions.Item label="가입최소나이">{newData.target?.startAge}세</Descriptions.Item>
                    <Descriptions.Item label="가입최대나이">{newData.target?.endAge}세</Descriptions.Item>
                    <Descriptions.Item label="최소신용등급">{newData.target?.creditRating}등급</Descriptions.Item>
                    <Descriptions.Item label="보험상태" span={3}>
                        {newData.status === "결재완료" ? <Badge status="processing" text="Running" /> :
                            <>
                                <Badge status="success" text="결재 대기중"/>
                                <Button style={{float:'right'}} onClick={onClick}>결재 승인</Button>
                            </>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="보상범위" span={3}>
                        {newData.liablityCoverages?.map((data, i) =>
                            <span>{data} <Divider type="vertical" /></span>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="사고시 제출서류" span={3}>
                        {newData.accidentDocuments?.map((data, i) =>
                            <span>{data} <Divider type="vertical" /></span>
                        )}
                    {/* 빈 어레이도 맵 돌아감, 근데 undefined null은 map 불가능 */}
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
    }else{return null;}
}

export default SupportDetail;