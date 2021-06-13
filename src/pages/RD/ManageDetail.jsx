import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import useAsync from "../../customHooks/useAsync";
import axios from "axios";
import {Button, Row, Col, Form, Input, InputNumber, Select, Spin, Statistic, Tabs, Progress, notification} from "antd";
import styled from "styled-components";
import {Line, Bar, Doughnut} from "react-chartjs-2";

async function getInsurance(id) {
    const response = await axios.get(
        `http://hminsu.net/api/insurance/${id}`
    );
    return response.data.data;
}
const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: space-around;
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-right: 3px;
    padding-left: 3px;
    margin-top: 2rem;
    background-color: white;
`;

const ManageDetail = ({match}) => {
    const { id } = match.params;
    const [newData, setNewData] = useState({});
    const [state] = useAsync(() => getInsurance(id), setNewData,[id]);
    const { loading, data: insurance, error } = state;
    const { TabPane } = Tabs;
    const [quaterData, setQuaterData] = useState({});
    const [channelData, setChannelData] = useState({});
    const makeQuaterData = (items) => {
        console.log(items);
        let quater = [0, 0, 0, 0];
        let channel = [0, 0, 0];
        items?.forEach(d => {
            const currentDate = new Date(d.contractDate.registerDate);
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const date = currentDate.getDate();

            if (month >= 1 && month < 4) {
                quater[0] += 1;
            } else if (month >= 4 && month < 7) {
                quater[1] += 1;
            } else if (month >= 7 && month < 10) {
                quater[2] += 1;
            } else {
                quater[3] += 1;
            }
            console.log(quater);
        });
        items?.forEach(d => {
            const ch = d.channel;
            if (ch === "온라인")
                channel[0] += 1;
            else if (ch === "전화")
                channel[1] += 1;
            else
                channel[2] += 1;
            console.log(channel);
        })

        setQuaterData({
            labels: ["1분기", "2분기", "3분기", "4분기"],
            datasets: [
                {
                    label : "계약 고객",
                    backgroundColor : "#A0CBED",
                    barThickness: 40,
                    fill : true,
                    data : quater
                }
            ]
        });
        setChannelData({
            labels: ["온라인", "전화", "대면"],
            datasets: [
                {
                    label : "온라인, 전화, 대면",
                    backgroundColor : ["#ff3d67", "#059bff", "#ffc233"],
                    cutout : '50%',
                    fill : false,
                    data : channel
                }
            ]
        });
    }

    // const title = insurance.name;

    useEffect(() => {
        console.log(newData);
        if (newData != {}) {
            makeQuaterData(newData.contractList);
        }
    }, [newData]);

    console.log(newData);
    if (error) return <div>에러가 발생했습니다</div>;
    if (!insurance || loading) {
        return(
            <Wrapper>
                <Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/>
            </Wrapper>
        );
    }

    function callback(key) {
        console.log(key);
    }

    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if(Array.isArray(value)){
            setNewData({
                ...newData,
                [name] : [...value]
            });
            console.log('array val', value)
        }else{
            setNewData({
                ...newData,
                [name]: value});
            console.log('single val', value)
        }
    }
    const postInsurance = async() => {
        const url = `https://hminsu.net/api/insurance/${id}/status`;
        axios.put(url, {
            id: newData.id,
            name: newData.name,
            type: newData.type,
            description: newData.description,
            liablityCoverages: newData.liablityCoverages,
            accidentDocuments: newData.accidentDocuments,
            status: '1'
        }).then(r => console.log(r));
    }
    const handleSubmit = async () => {
        const data = await postInsurance(id);
        console.log(data)
    }

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: '분기별 계약 추세',
            }
        },

    }

    return(
        <Wrapper title={insurance.name} underline={false}>
            {/*<div style={{marginTop: '1rem'}}>{insurance.description}</div>*/}
            <Tabs style={{marginTop: '1rem', height: '100%'}} defaultActiveKey="1" onChange={callback}>
                <TabPane tab="상품분석" key="1">
                    <div style={{marginTop: '1rem'}}>
                        <Row gutter={8}>
                            <Col span={8}>
                                <Statistic title="계약 수" value={112893} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="보상지급 계약 수" value={112893} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="중도해지 계약 수" value={112893} />
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1rem'}} gutter={8}>
                            <Col span={8}>
                                <Statistic title="위험률" value="13%" />
                            </Col>
                            <Col span={8}>
                                <Statistic title="전체 차지 비율" value="15%" precision={2} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="이윤" value={111223000000} precision={2} />
                            </Col>
                        </Row>
                        <StyledDiv>
                            <div style={{width: '60%'}}>
                                <Line data={quaterData} width={30} height={15} options={options}/>
                            </div>

                            <div style={{height: '300px', width: '40%', marginTop: '15px'}}>
                                <Doughnut width={7} height={7} className="doughnut" data={channelData} options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                        },
                                        title: {
                                            display: true,
                                            text: '채널별 비율',
                                            fontSize: 16
                                        },

                                    }}} />
                            </div>
                        </StyledDiv>

                    </div>
                </TabPane>
                <TabPane tab="상품수정" key="2">
                    <Form labelCol={{span: 3,}} wrapperCol={{span: 10,}} layout="vertical" scrollToFirstError={true} onFinish={handleSubmit}>

                        <Form.Item required={true} label="보험상품 이름" ><Input name="name" value={newData.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/></Form.Item>
                        <Form.Item required={true} label="보험상품 ID번호" ><Input name="id" value={newData.id} onChange={handleChange} placeholder="예시) xxxx-xxxx"/></Form.Item>
                        <Form.Item required={true} label="상품 항목">

                            <Select value={newData.type} onChange={(val)=>{handleChange({target: {name: 'type', value: val}})}}>
                                <Select.Option value="Car">자동차 보험</Select.Option>
                                <Select.Option value="Driver">운전자 보험</Select.Option>
                                <Select.Option value="Fire">화재 보험</Select.Option>
                                <Select.Option value="Traveller">여행자 보험</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="가입 연령대" style={{ marginBottom: 0 }}>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                                <Input name="minimum"placeholder="가입 최저 연령을 입력해주세요" />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                                <Input name="maximum" placeholder="가입 최고 연령을 입력해주세요" />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="보험 상품의 보장내용" required={true} rules={[{message: '하나 이상의 제출 서류를 선택해주세요', type:'array'}]}>
                            <Select mode="multiple" value={newData.liablityCoverages} onChange={(val)=>{handleChange({target: {name: 'liablityCoverages', value: val}})}}
                                    placeholder="보험 상품의 사고 보장내용을 선택해주세요">
                                <Select.Option value="bodilyCoverage">대인배상</Select.Option>
                                <Select.Option value="propertyCoverage">대물배상</Select.Option>
                                <Select.Option value="selfAccident">자기신체사고</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="보험 가입시 요구 제출 서류" required={true} rules={[{ message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]}>
                            <Select mode="multiple" value={newData.accidentDocuments} onChange={(val)=>{handleChange({target: {name: 'accidentDocuments', value: val}})}}
                                    placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">
                                <Select.Option value="driverLicense">운전면허</Select.Option>
                                <Select.Option value="accidentHistory">운전자 사고 이력</Select.Option>{/*option??*/}
                                <Select.Option value="carRegistration">자동차 등록증</Select.Option>
                                <Select.Option value="building">집 문서??ㅋ</Select.Option>
                                <Select.Option value="passport">여권사본</Select.Option>
                                <Select.Option value="flightTicket">항공 탑승권 등 여행증명서류</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item required={true} label="보험상품 개요"><Input.TextArea name="description" value={newData.description} onChange={handleChange}/></Form.Item>
                        <Form.Item required={true} label="기초 보험요율"><InputNumber defaultValue={1.23} min={0} max={100.00} step="0.01" formatter={value => `${value}%`} parser={value => value.replace('%', '')}
                            // onChange={this.handleChange}
                        /></Form.Item>

                        <Form.Item><Button type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Wrapper>
    )
}

export default ManageDetail;