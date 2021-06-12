import React, {useEffect, useState} from "react";
import {Form, Input, Button, Select, InputNumber, DatePicker, Row, Col} from 'antd';
import axios from "axios";
import {Wrapper} from "../../components/Wrapper";
import "../../css/Detail.css";

async function addCooperation(data, form) {
    const url = 'http://hminsu.net/api/partner/create';
    const response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'content-type': 'application/json'}
    }).then(

        form.resetFields
    ).catch(err => {
        console.log(err.message);
    });
    console.log(response);

    return response.data;
}

const AddCooperation = (history) => {
    const title = "협력업체 추가"
    const subtitle = "HM보험과 협력관계를 가지는 업체를 추가합니다."

    const [form] = Form.useForm();
    const [state, setState] = useState({
        name: '',
        address: '',
        contactNumber: '',
        category: '',
        employeeId: '',
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
        const data = await addCooperation(state, form);
        console.log(data);
    }
    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form form = {form} labelCol={{span: 10,}} wrapperCol={{span: 14,}} size={"large"} layout="vertical" onFinish={handleSubmit}>
                <Form.Item rules={[{required: true, message: '업체 이름을 입력해주세요!'}]} name="name" label="업체 이름" >
                    <Input name="name" value={state.name} onChange={handleChange} placeholder="업체의 이름을 입력해주세요"/>
                </Form.Item>

                <Form.Item rules={[{required: true, message: '업체 주소를 입력해주세요!'}]} name="address" label="업체 주소">
                    <Input name="address" value={state.address} onChange={handleChange} placeholder="업체 주소를 입력해주세요"/>
                </Form.Item>

                <Form.Item rules={[{required: true, message: '업체 전화번호를 입력해주세요!'}]} name="contactNumber" label="업체 전화번호">
                    <Input name="contactNumber" value={state.contactNumber} onChange={handleChange} placeholder="업체 전화번호를 입력해주세요"/>
                </Form.Item>

                <Form.Item rules={[{required: true, message: '업체의 종류를 입력해주세요!'}]} name="category" label="업체 종류">
                    <Select value={state.category} placeholder="업체 종류를 선택해주세요" onChange={(val)=>{handleChange({target: {name: 'category', value: val}})}}>
                        <Select.Option value="병원">병원</Select.Option>
                        <Select.Option value="현장출동업체">현장출동 업체</Select.Option>
                        <Select.Option value="자동차정비업체">자동차 정비업체</Select.Option>
                        <Select.Option value="변호사">변호사</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item rules={[{required: true, message: '담당하는 직원 ID 정보를 입력해주세요'}]} name="employeeId" label="협력관계 담당 직원 ID">
                    <Input name="employeeId" value={state.employeeId} onChange={handleChange} placeholder="업체를 관리하는 담당 직원의 ID를 입력해주세요"/>
                </Form.Item>
                <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    );
}
export default AddCooperation;