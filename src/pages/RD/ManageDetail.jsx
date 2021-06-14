import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import useAsync from "../../customHooks/useAsync";
import axios from "axios";
import {Button, Row, Col, Form, Input, InputNumber, Select, Spin, Statistic, Tabs, Progress, notification} from "antd";
import styled from "styled-components";
import {Line, Bar, Doughnut} from "react-chartjs-2";

async function getInsurance(id) {
    const response = await axios.get(
        `/api/insurance/${id}`
    );
    return response.data.data;
}

async function updateInsurance(data, form, id) {
    const url = `/api/insurance/${id}`;
    const response = await axios({
        method: 'post',
        url: url,
        // data: data, todo: documents to string
        data: {...data,
            coverage: (data.coverage).toString(),
            registerDocument: (data.registerDocument).toString(),
            accidentDocument: (data.accidentDocument).toString()
        },
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        notification.open({
            message: 'Notification!',
            description:
                '보험정보 전송 완료'
        })
        form.resetFields();
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    return response;
}

const test = (data, form, id) => {
    const tmp = {...data,
        target: {
            startAge: data.startAge,
            endAge: data.endAge,
            creditRating: data.creditRating
        },
        coverage: (data.coverage).toString(),
        registerDocument: (data.registerDocument).toString(),
        accidentDocument: (data.accidentDocument).toString()
    }
    console.log(tmp);
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
    const [newData, setNewData] = useState({
        name: '',
        description: '',
        coverage: '',
        registerDocument: '',
        accidentDocument: '',
        basePrice: '',
        target: {
            startAge: '',
            endAge: '',
            creditRating: ''
        },
        category: '',
        createEmployeeId : '1',
        managementEmployeeId : '1'
    });
    const settingNewData = (data) => {
        if (data) {
            setNewData({
                ...data,
                coverage: data.coverage?.toString().split(',').map((data) => data),
                registerDocument: data.registerDocument?.toString().split(',').map((data) => data),
                accidentDocument: data.accidentDocument?.toString().split(',').map((data) => data),
                managementEmployeeId: data.managementEmployee?.id,
                createEmployeeId: data.createEmployee?.id
            });
            console.log("newData",data);
        }
    }
    const [state] = useAsync(() => getInsurance(id), settingNewData,[id]);
    const { loading, data: insurance, error } = state;
    const { TabPane } = Tabs;
    const [quaterData, setQuaterData] = useState({});
    const [channelData, setChannelData] = useState({});
    const [form] = Form.useForm();
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
        });
        items?.forEach(d => {
            const ch = d.channel;
            if (ch === "온라인")
                channel[0] += 1;
            else if (ch === "전화")
                channel[1] += 1;
            else
                channel[2] += 1;
        })

        setQuaterData({
            labels: ["1분기", "2분기", "3분기", "4분기"],
            datasets: [
                {
                    label : "계약 고객",
                    backgroundColor : "#A0CBED",
                    barThickness: 40,
                    fill : false,
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
        console.log("event name", name);
        if(Array.isArray(value)){
            setNewData({
                ...newData,
                [name] : [...value]
            });
            console.log('array val', value)
        } else if (typeof value === "string") {
            setNewData({
                ...newData,
                [name]: value});
            console.log('single val', value)
        } else if (name === 'target'){
            setNewData({
                ...newData,
                target: {
                    ...newData.target,
                    [Object.keys(value)[0]]: Object.values(value)[0]
                }
            });
            console.log('object val', value);
            console.log('name', name);
            console.log('target', newData.target);
        }
        console.log(newData.coverage);
    }

    const handleSubmit = async () => {
        const data = await updateInsurance(newData, form, id);
        // test(newData, form, id);
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
            <Tabs style={{marginTop: '1rem'}} defaultActiveKey="1" onChange={callback}>
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
                    <Form form={form} initialValues={newData} labelCol={{span: 10}} wrapperCol={{span: 14}} layout="vertical" size={"large"} onFinish={handleSubmit}>
                        <Form.Item rules={[{required: true, message: '보험의 이름을 입력해주세요!'}]} name="name" label="보험상품 이름" >
                            <Input name="name" value={newData.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/>
                        </Form.Item>

                        <Form.Item rules={[{required: true, message: '상품의 종류를 선택해주세요!'}]} name='category' label="상품 항목">
                            <Select value={newData.category} onChange={(val)=>{handleChange({target: {name: 'category', value: val}})}}>
                                <Select.Option value="자동차">자동차 보험</Select.Option>
                                <Select.Option value="운전자">운전자 보험</Select.Option>
                                <Select.Option value="화재">화재 보험</Select.Option>
                                <Select.Option value="여행자">여행자 보험</Select.Option>
                            </Select>
                        </Form.Item>
                        <Row>
                            <Col span={7}>
                                <Form.Item wrapperCol={12} label="가입 연령대">
                                    <InputNumber style={{ display: 'inline-block', width: '45%', marginInlineEnd:'4px'}} placeholder="가입 최저 연령"
                                                 min={0} max={100.00} name="startAge" defalutValue={newData.target?.startAge} value={newData.target?.startAge}
                                                 onChange={(val)=>{handleChange({target: {name: 'target', value: {startAge: val}}})}}/>

                                    <InputNumber style={{ display: 'inline-block', width: '45%'}} placeholder="가입 최고 연령"
                                                 min={0} max={100.00} name="endAge" defalutValue={newData.target?.endAge} value={newData.target?.endAge}
                                                 onChange={(val)=>{handleChange({target: {name: 'target', value: {endAge: val}}})}}/>
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item wrapperCol={12} name={"creditRating"} label="최소 신용등급">
                                    <InputNumber style={{ display: 'inline-block', width: '100%'}}
                                                 min={1} max={10} step="1" name="creditRating" placeholder={newData.target?.creditRating} value={newData.target?.creditRating}
                                                 onChange={(val)=>{handleChange({target: {name: 'target', value: {creditRating: val}}})}}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="보험 상품의 보장내용" name={'coverage'} rules={[{required:true, message: '하나 이상의 보장내용을 선택해주세요', type:'array'}]}>
                            <Select mode="multiple" value={newData.coverage} defaultValue={newData.coverage} onChange={(val)=>{handleChange({target: {name: 'coverage', value: val}})}}
                                    placeholder="보험 상품의 사고 보장내용을 선택해주세요">
                                <Select.Option value="대인배상">대인배상</Select.Option>
                                <Select.Option value="대물배상">대물배상</Select.Option>
                                <Select.Option value="자기신체사고">자기신체사고</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="보험 가입시 요구 제출 서류" name={'registerDocument'} rules={[{required: true, message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]}>
                            <Select mode="multiple" value={newData.registerDocument} defaultValue={newData.registerDocument} onChange={(val)=>{handleChange({target: {name: 'registerDocument', value: val}})}}
                                    placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">
                                <Select.Option value="운전면허">운전면허</Select.Option>
                                <Select.Option value="운전자 사고 이력">운전자 사고 이력</Select.Option>{/*option??*/}
                                <Select.Option value="자동차 등록증">자동차 등록증</Select.Option>
                                <Select.Option value="건물 등록 문서">건물 등록 문서</Select.Option>
                                <Select.Option value="여권사본">여권사본</Select.Option>
                                <Select.Option value="항공 탑승권 등 여행 증명서류">항공 탑승권 등 여행 증명서류</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item rules={[{required: true, message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]} name={'accidentDocument'} label="사고 보상청구시 요구 제출 서류">
                            <Select mode="multiple" value={newData.accidentDocument} defaultValue={newData.accidentDocument} onChange={(val)=>{handleChange({target: {name: 'accidentDocument', value: val}})}}
                                    placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">
                                <Select.Option value="사고 처리 협력업체 영수증">사고 처리 협력업체 영수증</Select.Option>
                                <Select.Option value="자동차 정비 영수증">자동차 정비 영수증</Select.Option>
                                <Select.Option value="병원 진단서">병원 진단서</Select.Option>
                                <Select.Option value="사고 경위서">사고 경위서</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item rules={[{required:true, message: '보험의 기초 보험료를 입력해주세요'}]} name="basePrice" label="기초 보험료(KRW)">
                            <InputNumber style={{width : '50%'}}
                                         defaultValue={100000} min={0} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} step={1000}
                                         parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                         onChange={(val)=>{if(val > 0){handleChange({target: {name: 'basePrice', value: val}})}}}/>
                        </Form.Item>

                        <Form.Item rules={[{required:true, message: '보험의 개괄적인 설명을 입력해주세요'}]} name={"description"} label="보험상품 개요">
                            <Input.TextArea name="description" value={newData.description} onChange={handleChange}/>
                        </Form.Item>
                        <Form.Item required={true} name="createEmployeeId" label="보험을 생성하는 직원 ID" >
                            <Input readOnly={true} name="createEmployeeId" defaultValue={newData.createEmployee?.id} value={newData.createEmployeeId} disabled={true}/>
                            {/*onInput={(val)=>{handleChange({target: {name: 'createEmployeeId', value: val}})}}/>*/}
                        </Form.Item>

                        <Form.Item rules={[{required: true, message: '담당 직원을 입력해주세요!'}]} name="managementEmployeeId" label="보험 담당책임 직원 ID" >
                            <Input name="managementEmployeeId" defaultValue={newData.managementEmployee?.id} value={newData.managementEmployeeId} onChange={handleChange}/>
                        </Form.Item>
                        <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Wrapper>
    )
}

export default ManageDetail;