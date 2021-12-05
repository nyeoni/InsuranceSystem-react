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
        `/insurance/${id}`
    );
    return response.data.data;
}
async function statusInsurance(id, data) {
    console.log('status on api call ',data.status)
    const url = `/insurance/${id}/status`;
    const response = await axios({
        method: 'post',
        url: url,
        data: { status : data },
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        notification.open({
            message: 'Notification!',
            description: '보험상태 정보 전송 완료'
        })
        window.location.reload();
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
        conditions: {rating: '', startAge: '', endAge: ''},
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
        const data = statusInsurance(id, "결재완료");
        console.log('data after api call', data)
    }

    if(newData){
        return (
            <Wrapper title={newData.name} underline={true}>
                <SubTitle text="상품개요" />
                <Descriptions bordered>
                    <Descriptions.Item label="상품명" span={2}>{newData.name}</Descriptions.Item>
                    <Descriptions.Item label="보험분류">{newData.category}</Descriptions.Item>
                    <Descriptions.Item label="가입최소나이">{newData.conditions?.startAge}세</Descriptions.Item>
                    <Descriptions.Item label="가입최대나이">{newData.conditions?.endAge}세</Descriptions.Item>
                    <Descriptions.Item label="최소신용등급">{newData.conditions?.rating}등급</Descriptions.Item>
                    <Descriptions.Item label="보험상태" span={3}>
                        <Badge status="processing" text="상품 운영중" />
                    </Descriptions.Item>
                    <Descriptions.Item label="보험설명" span={3}>
                        {newData.description}
                    </Descriptions.Item>
                </Descriptions>
            </Wrapper>
        );
    }else{return null;}
}

export default SupportDetail;
