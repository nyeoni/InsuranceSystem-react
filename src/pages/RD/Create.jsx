import React, {useState} from "react";
import {Form, Input, Button, Select,InputNumber} from 'antd';
import axios from "axios";
import {Wrapper} from "../../components/Wrapper";
//특약 종류, 보험료, 위험률 ??
//     "status": 1
//todo: 최저 연령, 최고 연령, 기초 보험요율 api

const Create = () => {
    const title = "상품개발"
    const subtitle = "HM 손해보험의 보험상품을 개발하기 위한 페이지입니다."
    const [state, setState] = useState({
        id: '',
        name: '',
        type: '',
        description: '',
        liablityCoverages: [],
        accidentDocuments: [],
        status : '1'
    })

    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if(Array.isArray(value)){
            setState({
                ...state,
                [name] : [...value]
            });
            console.log('array val', value)
        }else{
            setState({
                ...state,
                [name]: value});
            console.log('single val', value)
        }
    }
    const postInsurance = () => {
        const url = 'https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/insurance';
        // const formData = new FormData();
        // formData.append('id', state.id)
        // formData.append('name', state.name)
        // formData.append('type', state.type)
        // formData.append('description', state.description)
        // formData.append('liablityCoverages', state.liablityCoverages)
        // formData.append('accidentDocuments', state.accidentDocuments)
        // formData.append('status', state.status)
        // return axios.post(url, formData);
        axios.post(url, {
            id: state.id,
            name: state.name,
            type: state.type,
            description: state.description,
            liablityCoverages: state.liablityCoverages,
            accidentDocuments: state.accidentDocuments,
            status: '1'
        }).then(r => console.log(r));
    }
    const handleSubmit = () => {
        postInsurance().then((response) => {console.log('response, ', response.data)})
    }
    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form labelCol={{span: 3,}} wrapperCol={{span: 10,}} layout="vertical" scrollToFirstError={true} onFinish={handleSubmit}>

                <Form.Item required={true} label="보험상품 이름" ><Input name="name" value={state.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/></Form.Item>
                <Form.Item required={true} label="보험상품 ID번호" ><Input name="id" value={state.id} onChange={handleChange} placeholder="예시) xxxx-xxxx"/></Form.Item>
                <Form.Item required={true} label="상품 항목">

                    <Select value={state.type} onChange={(val)=>{handleChange({target: {name: 'type', value: val}})}}>
                        <Select.Option value="Car">자동차 보험</Select.Option>
                        <Select.Option value="Driver">운전자 보험</Select.Option>
                        <Select.Option value="Fire">화재 보험</Select.Option>
                        <Select.Option value="Traveller">여행자 보험</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="가입 연령대" style={{ marginBottom: 0 }}>
                    <Form.Item >
                        <Input style={{ display: 'inline-block', width: 'calc(50% - 4px)', marginInlineEnd:'8px'}}name="minimum" placeholder="가입 최저 연령을 입력해주세요"/>
                        <Input style={{ display: 'inline-block', width: 'calc(50% - 4px)'}} name="maximum" placeholder="가입 최고 연령을 입력해주세요" />
                    </Form.Item>
                </Form.Item>

                <Form.Item label="보험 상품의 보장내용" required={true} rules={[{message: '하나 이상의 제출 서류를 선택해주세요', type:'array'}]}>
                    <Select mode="multiple" value={state.liablityCoverages} onChange={(val)=>{handleChange({target: {name: 'liablityCoverages', value: val}})}}
                            placeholder="보험 상품의 사고 보장내용을 선택해주세요">
                        <Select.Option value="bodilyCoverage">대인배상</Select.Option>
                        <Select.Option value="propertyCoverage">대물배상</Select.Option>
                        <Select.Option value="selfAccident">자기신체사고</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="보험 가입시 요구 제출 서류" required={true} rules={[{ message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]}>
                    <Select mode="multiple" value={state.accidentDocuments} onChange={(val)=>{handleChange({target: {name: 'accidentDocuments', value: val}})}}
                            placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">
                        <Select.Option value="driverLicense">운전면허</Select.Option>
                        <Select.Option value="accidentHistory">운전자 사고 이력</Select.Option>{/*option??*/}
                        <Select.Option value="carRegistration">자동차 등록증</Select.Option>
                        <Select.Option value="building">집 문서??ㅋ</Select.Option>
                        <Select.Option value="passport">여권사본</Select.Option>
                        <Select.Option value="flightTicket">항공 탑승권 등 여행증명서류</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item required={true} label="보험상품 개요"><Input.TextArea name="description" value={state.description} onChange={handleChange}/></Form.Item>
                <Form.Item required={true} label="기초 보험요율"><InputNumber defaultValue={1.23} min={0} max={100.00} step="0.01" formatter={value => `${value}%`} parser={value => value.replace('%', '')}
                    // onChange={this.handleChange}
                /></Form.Item>

                <Form.Item><Button type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    );
}
export default Create;