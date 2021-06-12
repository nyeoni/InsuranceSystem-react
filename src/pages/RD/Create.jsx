import React, {useEffect, useState} from "react";
import {Form, Input, Button, Select,InputNumber, Row, Col} from 'antd';
import axios from "axios";
import {Wrapper} from "../../components/Wrapper";
import "../../css/Detail.css";
import {useSelector} from "react-redux";

async function postInsurance(data) {
    const url = '/api/insurance/create';
    const response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'content-type': 'application/json'}
    }).catch(err => {
        console.log(err.message);
    });
    console.log(response);

    return response.data;
}

const Create = () => {
    const title = "상품개발"
    const subtitle = "HM 손해보험의 보험상품을 개발하기 위한 페이지입니다."
    // const userId = useSelector(state => (state.user.data.id))

    const [state, setState] = useState({
        name: '',
        description: '',
        coverages: [],
        registerDocuments: [],
        accidentDocuments: [],
        basePremiumRate: '',
        startAge: '',
        endAge: '',
        creditRating: '',
        category: '',
        createEmployeeId : '1',
        managementEmployeeId : '1'
    })

    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if(Array.isArray(value)){
            setState({
                ...state,
                [name] : [...value] //[target.startAge]
            });
            console.log('array val', value)
        }else{
            setState({...state, [name]: value});
            console.log('single val', value)
        }
        // console.log('state, ', state);
    }
    useEffect(() => {
        console.log('useEffect ',state);
    }, [state])

<<<<<<< HEAD
    // const postInsurance = () => {
    //     const url = 'http://hminsu.net/api/insurance/create';
    //     const {name, description,coverages, registerDocuments, accidentDocuments,basePremiumRate,category,
    //         startAge, endAge, creditRating,createEmployeeId,managementEmployeeId }= state;
    //     axios.post(url, {
    //         name,
    //         description,
    //         coverages,
    //         registerDocuments,
    //         accidentDocuments,
    //         basePremiumRate,
    //         category,
    //         createEmployeeId,
    //         managementEmployeeId,
    //         target : {startAge, endAge, creditRating},
    //     }).then(r => {console.log(r)
    //         alert("api 성공")
    //     }).catch(err => {
    //         console.log(err.message);
    //     });
    // }
    const handleSubmit = async () => {
        // postInsurance()
        // .then((response) => {console.log('response, ', response.data)})
        const data = await postInsurance(state);
        console.log(data);
=======
    async function postInsurance  ()  {
        const url = 'http://hminsu.net/api/insurance/create';
        const {name, description,coverages, registerDocuments, accidentDocuments,basePremiumRate,category,
            startAge, endAge, creditRating,createEmployeeId,managementEmployeeId }= state;
        axios.post(url, {
            name,
            description,
            coverages,
            registerDocuments,
            accidentDocuments,
            basePremiumRate,
            category,
            createEmployeeId,
            managementEmployeeId,
            target : {startAge, endAge, creditRating},
        }).then(r => {console.log(r)
            alert("api 성공")
        });
    }

    const handleSubmit = async () => {
        const value = await postInsurance()
            // .then((response) => {console.log('response, ', response.data)})
>>>>>>> soohyuk
    }
    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form labelCol={{span: 10,}} wrapperCol={{span: 14,}} layout="vertical" size={"large"} onFinish={handleSubmit}>
                <Form.Item rules={[{required: true, message: '보험의 이름을 입력해주세요!'}]} name="name" label="보험상품 이름" >
                    <Input name="name" value={state.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/>
                </Form.Item>

                <Form.Item rules={[{required: true, message: '상품의 종류를 선택해주세요!'}]} name='category' label="상품 항목">
                    <Select value={state.category} onChange={(val)=>{handleChange({target: {name: 'category', value: val}})}}>
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
                                         min={0} max={100.00} name="startAge" value={state.startAge}
                                         onChange={(val)=>{handleChange({target: {name: 'startAge', value: val}})}}/>

                            <InputNumber style={{ display: 'inline-block', width: '45%'}} placeholder="가입 최고 연령"
                                         min={0} max={100.00} name="endAge" value={state.endAge}
                                         onChange={(val)=>{handleChange({target: {name: 'endAge', value: val}})}}/>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} name={"creditRating"} label="최소 신용등급">
                            <InputNumber style={{ display: 'inline-block', width: '100%'}}
                                   min={1} max={10} step="1" name="creditRating" placeholder="1~10등급" value={state.creditRating}
                                   onChange={(val)=>{handleChange({target: {name: 'creditRating', value: val}})}}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="보험 상품의 보장내용" name={'coverages'} rules={[{required:true, message: '하나 이상의 보장내용을 선택해주세요', type:'array'}]}>
                    <Select mode="multiple" value={state.coverages} onChange={(val)=>{handleChange({target: {name: 'coverages', value: val}})}}
                            placeholder="보험 상품의 사고 보장내용을 선택해주세요">
                        <Select.Option value="대인배상">대인배상</Select.Option>
                        <Select.Option value="대물배상">대물배상</Select.Option>
                        <Select.Option value="자기신체사고">자기신체사고</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="보험 가입시 요구 제출 서류" name={'registerDocuments'} rules={[{required: true, message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]}>
                    <Select mode="multiple" value={state.registerDocuments} onChange={(val)=>{handleChange({target: {name: 'registerDocuments', value: val}})}}
                            placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">
                        <Select.Option value="운전면허">운전면허</Select.Option>
                        <Select.Option value="운전자 사고 이력">운전자 사고 이력</Select.Option>{/*option??*/}
                        <Select.Option value="자동차 등록증">자동차 등록증</Select.Option>
                        <Select.Option value="건물 등록 문서">건물 등록 문서</Select.Option>
                        <Select.Option value="여권사본">여권사본</Select.Option>
                        <Select.Option value="항공 탑승권 등 여행 증명서류">항공 탑승권 등 여행 증명서류</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item rules={[{required: true, message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]} name={'accidentDocuments'} label="사고 보상청구시 요구 제출 서류">
                    <Select mode="multiple" value={state.accidentDocuments} onChange={(val)=>{handleChange({target: {name: 'accidentDocuments', value: val}})}}
                            placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">
                        <Select.Option value="사고 처리 협력업체 영수증">사고 처리 협력업체 영수증</Select.Option>
                        <Select.Option value="자동차 정비 영수증">자동차 정비 영수증</Select.Option>
                        <Select.Option value="병원 진단서">병원 진단서</Select.Option>
                        <Select.Option value="사고 경위서">사고 경위서</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item rules={[{required:true, message: '보험의 기초 보험요율을 입력해주세요'}]} name="basePremiumRate" label="기초 보험요율">
                    <InputNumber min={0} max={100.00} step="0.01" value={state.basePremiumRate}
                                 formatter={value => `${value}%`} parser={value => value.replace('%', '')}
                                 onChange={(val)=>{handleChange({target: {name: 'basePremiumRate', value: val}})}}/>
                </Form.Item>

                <Form.Item rules={[{required:true, message: '보험의 개괄적인 설명을 입력해주세요'}]} name={"description"} label="보험상품 개요">
                    <Input.TextArea name="description" value={state.description} onChange={handleChange}/>
                </Form.Item>
                <Form.Item required={true} name="createEmployeeId" label="보험을 생성하는 직원 ID" >
                    <Input readOnly={true} name="createEmployeeId" defaultValue={state.createEmployeeId} value={state.createEmployeeId} disabled={true}/>
                           {/*onInput={(val)=>{handleChange({target: {name: 'createEmployeeId', value: val}})}}/>*/}
                </Form.Item>

                <Form.Item rules={[{required: true, message: '담당 직원을 입력해주세요!'}]} name="managementEmployeeId" label="보험 담당책임 직원 ID" >
                    <Input name="managementEmployeeId" value={state.managementEmployeeId} onChange={handleChange}/>
                </Form.Item>
                <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    );
}
export default Create;