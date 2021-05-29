import React from "react";
import {Form, Input, Button, Select,InputNumber} from 'antd';
import axios from "axios";
import {Wrapper} from "../../components/Wrapper";
//특약 종류, 보험료, 위험률 ??
//     "status": 1

class Create extends React.Component{

    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            type: '',
            description: '',
            liablityCoverages: [],
            accidentDocuments: [],
            status : '1'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postInsurance = this.postInsurance.bind(this);
    }
    handleChange = (event) =>{
        // console.log(event)
        const target = event.target;
        // console.log('target ', target)
        const name = target.name;
        // console.log('target name', name)
        const value = target.value;
        if(Array.isArray(value)){
            this.setState({[name]: [...value]});
            console.log('array val', value)
        }else{
            this.setState({[name]: value});
            console.log('single val', value)
        }
    }
    handleSubmit = ()=>{
        this.postInsurance().then((response) => {console.log('response, ', response.data)})
    }
    postInsurance(){
        const url = 'https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/insurance';
        const formData = new FormData();
        formData.append('id', this.state.id)
        formData.append('name', this.state.name)
        formData.append('type', this.state.type)
        formData.append('description', this.state.description)
        formData.append('liablityCoverages', this.state.liablityCoverages)
        formData.append('accidentDocuments', this.state.accidentDocuments)
        formData.append('status', this.state.status)
        return axios.post(url, formData);
    }
    render() {
        const title = "상품개발"
        const subtitle = "HM 손해보험의 보험상품을 개발하기 위한 페이지입니다."

        return (
            <Wrapper title={title} subtitle={subtitle} underline={true}>
                <Form labelCol={{span: 3,}} wrapperCol={{span: 10,}} layout="vertical" scrollToFirstError={true} onFinish={this.handleSubmit}>

                    <Form.Item required={true} label="보험상품 이름" ><Input name="name" value={this.state.name} onChange={this.handleChange} placeholder="예시) XX 자동차 보험"/></Form.Item>
                    <Form.Item required={true} label="보험상품 ID번호" ><Input name="id" value={this.state.id} onChange={this.handleChange} placeholder="예시) xxxx-xxxx"/></Form.Item>
                    <Form.Item required={true} label="상품 항목">

                        <Select value={this.state.type} onChange={(val)=>{this.handleChange({target: {name: 'type', value: val}})}}>
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
                        <Select mode="multiple" value={this.state.liablityCoverages} onChange={(val)=>{this.handleChange({target: {name: 'liablityCoverages', value: val}})}}
                                placeholder="보험 상품의 사고 보장내용을 선택해주세요">
                            <Select.Option value="bodilyCoverage">대인배상</Select.Option>
                            <Select.Option value="propertyCoverage">대물배상</Select.Option>
                            <Select.Option value="selfAccident">자기신체사고</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="보험 가입시 요구 제출 서류" required={true} rules={[{ message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]}>
                        <Select mode="multiple" value={this.state.accidentDocuments} onChange={(val)=>{this.handleChange({target: {name: 'accidentDocuments', value: val}})}}
                                placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">
                            <Select.Option value="driverLicense">운전면허</Select.Option>
                            <Select.Option value="accidentHistory">운전자 사고 이력</Select.Option>{/*option??*/}
                            <Select.Option value="carRegistration">자동차 등록증</Select.Option>
                            <Select.Option value="building">집 문서??ㅋ</Select.Option>
                            <Select.Option value="passport">여권사본</Select.Option>
                            <Select.Option value="flightTicket">항공 탑승권 등 여행증명서류</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item  required={true} label="보험상품 개요"><Input.TextArea name="description" value={this.state.description} onChange={this.handleChange}/></Form.Item>
                    <Form.Item required={true} label="기초 보험요율"><InputNumber defaultValue={1.23} min={0} max={100.00} step="0.01" formatter={value => `${value}%`} parser={value => value.replace('%', '')}
                                                                            // onChange={this.handleChange}
                    /></Form.Item>

                    <Form.Item><Button type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
                </Form>
            </Wrapper>
        )
    }
}
export default Create;