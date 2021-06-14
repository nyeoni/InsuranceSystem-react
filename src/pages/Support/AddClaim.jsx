import React, {useEffect, useState} from "react";
import {Form, Input, Button, Select, InputNumber, DatePicker, Row, Col, notification} from 'antd';
import axios from "axios";
import {Wrapper} from "../../components/Wrapper";
import "../../css/Detail.css";

async function postClaim(data, form) {
    const url = '/api/claim/create';
    const response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        console.log('a', data)
        notification.open({
            message: 'Notification!',
            description: '사고정보 전송 완료'
        })
        form.resetFields();
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    return response;
}

const AddClaim = (history) => {
    //initial : compensation = null
    const title = "고객사고 신고"
    const subtitle = "고객에게 접수된 신고 내역을 시스템에 등록하는 페이지입니다."
    const [form] = Form.useForm();

    const [state, setState] = useState({
        employeeId: '',
        contractId: '',
        damageCost: '',
        claimDetail: '',
        claimRate: '',
        claimReason: '',
        accidentDate: '',
        status : '접수완료'
    })

    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({...state, [name]: value});
        // console.log('single val', state)
    }
    useEffect(() => {
        console.log('useEffect ',state);
    }, [state])

    const handleSubmit = async () => {
        const data = await postClaim(state, form);
        console.log(data)
    }

    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form form = {form} labelCol={{span: 10}} wrapperCol={{span: 14}} size={"large"} layout="vertical" onFinish={handleSubmit}
            initialValues={{damageCost : 1000000}}>
                <Form.Item rules={[{required: true, message: '담당 직원을 입력해주세요!'}]} name="employeeId" label="사고 접수 담당 직원ID" ><Input name="employeeId" value={state.employeeId} onChange={handleChange} placeholder="사고 접수를 담당하고있는 직원의 ID를 입력해주세요"/></Form.Item>
                <Form.Item rules={[{required: true, message: '계약 ID를 입력해주세요!'}]} name="contractId" label="계약 번호(ID)"><Input name="contractId" value={state.contractId} onChange={handleChange} placeholder="사고를 접수할 계약건의 ID를 입력해주세요"/></Form.Item>
                <Row>
                    <Col span={6}>
                        <Form.Item label={'손해액 (KRW)'} name= "damageCost" rules={[{required: true, message: '손해액을 입력해주세요!'}]}>
                            <InputNumber placeholder="손해의 가치(KRW)를 입력해주세요." style={{width : '92%'}}
                                         min={0} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} step={100000}
                                         parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                         onChange={(val)=>{if(val > 0){handleChange({target: {name: 'damageCost', value: val}})}}}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="accidentDate" label="사고일자" rules={[{required: true, message: '사고가 발생한 날짜를 선택해주세요!'}]}>
                            <DatePicker style={{width : '92%'}} onChange={(val)=>{if(val !== null){
                                console.log(val);
                                handleChange({target: {name: 'accidentDate', value: val.toISOString()}})}}}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label={'사고 원인'} name="claimReason" rules={[{required: true, message: '사고의 원인을 기술해주세요'}]}>
                    <Input style={{width:'100%'}} name="claimReason" value={state.claimReason} onChange={handleChange} placeholder="사고 원인과 개괄적인 설명을 입력해주세요"/>
                </Form.Item>

                <Form.Item label={'사고 내용'} name="claimDetail" rules={[{required: true, message: '사고의 정확한 내용을 기술해주세요'}]}>
                    <Input.TextArea style={{width:'100%'}} name="claimDetail" value={state.claimDetail}
                                    onChange={handleChange} placeholder="사고 발생 위치, 사고 정황, 발생 시각 등 상세정보를 입력해주세요"/>
                </Form.Item>

                <Form.Item label={'과실 비율'} required={false}>
                    <InputNumber defaultValue={50} min={0} max={100} style={{width : '20%'}}
                                 formatter={value => `${value}%`} parser={value => value.replace('%', '')}
                                 onChange={(val)=>{handleChange({target: {name: 'claimRate', value: val}})}}
                                 placeholder="접수한 고객의 과실 비율을 입력해주세요"/>
                </Form.Item>
                <Form.Item><Button type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    );
}
export default AddClaim;