import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import useAsync from "../../customHooks/useAsync";
import axios from "axios";
import {Button, Row, Col, Form, Input, InputNumber, Select, Spin, Statistic, Tabs, Progress} from "antd";
import styled from "styled-components";
import {Style} from "@material-ui/icons";

async function getInsurance(id) {
    const response = await axios.get(
        `https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/newinsurance/${id}`
    );
    return response.data;
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    // const title = insurance.name;

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
    const postInsurance = () => {
        const url = 'https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/insurance';
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
    const handleSubmit = () => {
        postInsurance();
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
                                <Statistic title="중도해지 계약 " value={112893} />
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
                            <div>
                                <div style={{fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)', }}>손해율</div>
                                <Progress type="circle" percent={70} />
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

                        <Form.Item  required={true} label="보험상품 개요"><Input.TextArea name="description" value={newData.description} onChange={handleChange}/></Form.Item>
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