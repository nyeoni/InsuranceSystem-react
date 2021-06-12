import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import {Row, Col, DatePicker, Form, Input, InputNumber, notification, Select, Button} from "antd";
import useAsync from "../../customHooks/useAsync";
import moment from 'moment'

async function getInsurance() {
    const response = await axios.get(
        'http://hminsu.net/api/insurance'
    );
    return response.data.data;
}

async function addContract(data, form) {
    const url = 'http://hminsu.net/api/contract/sign';
    const response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'content-type': 'application/json'}
    }).then(() => {
        form.resetFields();
        notification.open({
            message: 'Notification!',
            description:
                '계약 정보 전송 완료'
        })
        return response.data;
    }).catch(err => {
        console.log(err.message);
    });
}

const Apply = () => {
    useEffect(() =>{
        const today = new Date().toISOString();
        setState({registerDate: today})
    }, [])
    const title = "상품가입"
    const subtitle = "고객의 상품 가입을 요청하는 페이지입니다."
    const [form] = Form.useForm();
    const [state, setState] = useState({
        status: '계약신청',
        channel: '온라인',
        registerDate: '',
        startDate: '',
        endDate: '',
        clientId: '',
        insuranceId: '',
        employeeId: '',
    })
    useEffect(() => {
        console.log('useEffect ',state);
    }, [state])
//insurance
    const [data, setData] = useState([]);
    const settingData = (data) => {
        if (data) {setData(data);}
        else {console.log("데이터 설정 실패");}
    }
    const [initialState, refetch] = useAsync(getInsurance, settingData, [getInsurance]);
    const { loading, error } = initialState;
    if (error) {return (<div>에러가 발생하였습니다.</div>);}
//
    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({...state, [name]: value});
    }
    const handleSubmit = async () => {
        const data = await addContract(state, form);
        console.log(data);
    }
    if(data){
        return (
            <Wrapper title = {title} subtitle={subtitle} underline={true}>
                <Form labelCol={{span: 10}} wrapperCol={{span: 12}} layout="vertical" size={"large"} onFinish={handleSubmit}
                      initialValues={{registerDate : new Date().toISOString().split('T')[0]}}>
                    <Form.Item rules={[{required: true, message: '고객 ID를 입력해주세요!'}]} name="clientId" label="고객 ID" >
                        <Input style={{width:'95%'}} name="clientId" value={state.clientId} onChange={handleChange} placeholder={"고객의 ID를 입력해주세요"}/>
                    </Form.Item>
                    <Form.Item rules={[{required: true, message: '가입 상품을 선택해주세요!'}]} name='insuranceId' label="상품 선택">
                        <Select style={{width:'95%'}} value={state.insuranceId} placeholder={"가입할 상품을 입력해주세요"} onChange={(val)=>{
                            handleChange({target: {name: 'insuranceId', value: val}})
                        }}>
                            {Object.entries(data.map((v)=>{
                                return(<Select.Option value={v.id}>{v.id}: {v.name}</Select.Option>)
                            }))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="registerDate" label="등록일자" rules={[{required: true, message: '등록 날짜를 입력하세요'}]}>
                        <Input style={{width:'95%'}} name="registerDate" value={state.registerDate} readOnly={true}/>
                    </Form.Item>

                    <Row>
                        <Col span={6}>
                            <Form.Item wrapperCol={12} name="startDate" label="계약 시작일" rules={[{required: true, message: '계약 시작일을 입력하세요'}]}>
                                <DatePicker style={{width:'90%'}} onChange={(val)=>{if(val !== null){
                                    handleChange({target: {name: 'startDate', value: val.toISOString()}})}}}/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item wrapperCol={12} name="endDate" label="계약 만기일" rules={[{required: true, message: '계약 만기일을 입력하세요'}]}>
                                <DatePicker style={{width:'90%'}} disabledDate={(current)=>{
                                    return state.startDate && current && current.valueOf() < moment(state.startDate);
                                }}
                                            onChange={(val)=>{if(val !== null){
                                    handleChange({target: {name: 'endDate', value: val.toISOString()}})}}}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item rules={[{required: true, message: '해당 계약 담당 직원의 ID를 입력해주세요!'}]} name="employeeId" label="담당 직원 ID" >
                        <Input style={{width:'95%'}} name="employeeId" value={state.employeeId} onChange={handleChange}placeholder={"계약 담당 직원의 ID를 입력해주세요"}/>
                    </Form.Item>
                    <Form.Item><Button type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
                </Form>
            </Wrapper>
        )
    }
}

export default Apply;