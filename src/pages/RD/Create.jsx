import React, {useEffect, useState} from "react";
import {Form, Input, Button, Select, InputNumber, Row, Col, notification} from 'antd';
import axios from "axios";
import {Wrapper} from "../../components/Wrapper";
import "../../css/Detail.css";
import {SelectOptions} from "../../components/SelectOptions";
import {post} from "../../library/apiPost";

const Create = () => {
    const title = "상품개발"
    const subtitle = "HM 손해보험의 보험상품을 개발하기 위한 페이지입니다."
    const [form] = Form.useForm();

    const [state, setState] = useState({
        name: '',
        category: '',
        description: '',
        rating: '',
        startAge: '',
        endAge: '',
    })

    useEffect(() => {
        console.log('useEffect ',state);
    }, [state])//debug sync

    const insuranceCategory = [
        {label: '자동차보험', value: '자동차'},
        {label: '운전자보험 ', value: '운전자'},
        {label: '화재보험', value: '화재'},
        {label: '여행자보험', value: '여행'}
    ];

    const handleChange = (event) =>{
        const {name, value} = event.target;
        if(Array.isArray(value)){
            setState({...state, [name] : [...value]});
            console.log('array val', value)
        } else{
            setState({...state, [name]: value});
            console.log('single val', name)
            console.log('single val', value)
        }
    }

    const handleSubmit = async () => {
        const url = '/insurance';
        const payload = {
            name: state.name,
            category: state.category,
            description: state.description,
            conditions: {
                startAge: state.startAge,
                endAge: state.endAge,
                rating: state.rating
            }
        };
        const data = await post(url, payload, form);
        console.log(data);
    }

    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form form={form} labelCol={{span: 10}} wrapperCol={{span: 14}} layout="vertical" size={"large"} onFinish={handleSubmit}
                  initialValues={{basePrice: 100000, createEmployeeId: '1'}}
            >
                <Form.Item rules={[{required: true, message: '보험의 이름을 입력해주세요!'}]} name="name" label="보험상품 이름" >
                    <Input name="name" value={state.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/>
                </Form.Item>

                <SelectOptions onChangeMethod={handleChange} selectedName='category' selectValue={state.category} required={true}
                               label={'상품 항목'} selectPlaceholder={'상품의 종류를 선택하세요'} optionList={insuranceCategory}/>


                <Row>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label="가입 연령대">
                            <InputNumber style={{ display: 'inline-block', width: '45%', marginInlineEnd:'4px'}} placeholder="가입 최저 연령"
                                         min={0} max={100.00} name="startAge" value={state.startAge}
                                         onChange={(val)=>{handleChange({target: {name: 'startAge', value: val}})}}/>

                            <InputNumber style={{ display: 'inline-block', width: '45%'}} placeholder="가입 최고 연령"
                                         min={0} max={100.00} name="endAge" value={state.endAge}
                                         onChange={(val)=>{handleChange({target: {name: 'endAge', value: val}})}}/>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} name={"rating"} label="최소 신용등급">
                            <InputNumber style={{ display: 'inline-block', width: '100%'}}
                                   min={1} max={10} step="1" name="rating" placeholder="1~10등급" value={state.rating}
                                   onChange={(val)=>{handleChange({target: {name: 'rating', value: val}})}}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item rules={[{required:true, message: '보험의 설명을 입력해주세요'}]} name={"description"} label="보험상품 개요">
                    <Input.TextArea name="description" value={state.description} onChange={handleChange} placeholder={'보험의 정보를 적어주세요'}/>
                </Form.Item>

                <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    );
}
export default Create;
