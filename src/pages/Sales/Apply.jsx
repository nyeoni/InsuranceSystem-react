import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import {Row, Col, DatePicker, Form, Input, InputNumber, notification, Select, Button} from "antd";
import useAsync from "../../customHooks/useAsync";
import moment from 'moment'
import {SelectOptions} from "../../components/SelectOptions";

async function getInsurance() {
    const response = await axios.get(
        '/insurance'
    );
    return response.data.data;
}
//todo: 계약신청으로 요청하고, 나중에 인수심사에서 계약 승인으로 상태변경

const Apply = () => {
    useEffect(() =>{
        const today = new Date().toISOString();
        setState({registerDate: today});
    }, [])

    const title = "상품가입"
    const subtitle = "고객의 상품 가입을 요청하는 페이지입니다."
    const [form] = Form.useForm();
    const [state, setState] = useState({
        insuranceId: '',
        clientId: '',
        employeeId: '',
        startDate: '',
        endDate: '',
        channel: '',
        contractStatus: ''
    })
    useEffect(() => {
        // console.log('useEffect ',state);
    }, [state])
    const customerLevel = [
        {label: 'A', value: 'A'},
        {label: 'B', value: 'B'},
        {label: 'C', value: 'C'},
        {label: 'D', value: 'D'},
    ];
    const channelOption = [
        {label: '온라인', value: '온라인'},
        {label: '대면', value: '대면'},
        {label: '전화', value: '전화'},
    ];
//insurance
    const [insuranceData, setInsuranceData] = useState([]);
    // const insuranceData = [];
    const settingInsurance = (data) => {
        if (data) {setInsuranceData(data);}
        // if (data) {
        //     data.map(v => {insuranceData.push({'label': v.name, 'value': v.id});});
        //     console.log(insuranceData);
        // }
        else {console.log("데이터 설정 실패");}
    }
    const [initialState, refetch] = useAsync(getInsurance, settingInsurance, [getInsurance]);
    const { loading, error } = initialState;
    if (error) {return (<div>에러가 발생하였습니다.</div>);}
//
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setState({...state, [name]: value});
    }
    const handleSubmit = async () => {
        const url = '/constract';
        const payload = {
            insuranceId: state.insuranceId,
            clientId: state.clientId,
            employeeId: state.employeeId,
            contractDate: {
                startDate: state.startDate,
                endDate: state.endDate
            },
            channel: state.channel,
            contractStatus: '계약신청'
        };
        // const data = await addContract(state, form);
        // console.log(data);
    }

        return (
            <Wrapper title = {title} subtitle={subtitle} underline={true}>
                <Form form={form} labelCol={{span: 10}} wrapperCol={{span: 12}} layout="vertical" size={"large"} onFinish={handleSubmit}
                      initialValues={{registerDate : new Date().toISOString().split('T')[0]}}>

                    <Form.Item rules={[{required: true, message: '고객 ID를 입력해주세요!'}]} name="clientId" label="고객 ID" >
                        <Input name="clientId" value={state.clientId} onChange={handleChange} placeholder={"고객의 ID를 입력해주세요"}/>
                    </Form.Item>

                    <SelectOptions onChangeMethod={handleChange} selectName='insuranceId' selectValue={state.insuranceId} selectRequired={true}
                                   selectLabel={'상품 선택'} selectPlaceholder={'가입할 보험을 선택하세요'}/>

                    <Form.Item name="registerDate" label="등록일자" rules={[{required: true, message: '등록 날짜를 입력하세요'}]}>
                        <Input name="registerDate" value={state.registerDate} readOnly={true}/>
                    </Form.Item>

                    <Row>
                        <Col span={6}>
                            <Form.Item wrapperCol={12} name="startDate" label="계약 시작일" rules={[{required: true, message: '계약 시작일을 입력하세요'}]}>
                                <DatePicker style={{width:'95%'}} onChange={(val)=>{if(val !== null){
                                    handleChange({target: {name: 'startDate', value: val.toISOString()}})}}}/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item wrapperCol={12} name="endDate" label="계약 만기일" rules={[{required: true, message: '계약 만기일을 입력하세요'}]}>
                                <DatePicker style={{width:'100%'}}
                                            disabledDate={(current)=>{return state.startDate && current && current.valueOf() < moment(state.startDate);}}
                                            onChange={(val)=>{if(val !== null){
                                    handleChange({target: {name: 'endDate', value: val.toISOString()}})}}}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <SelectOptions onChangeMethod={handleChange} selectName='channel' selectValue={state.channel} selectRequired={true}
                                   selectLabel={'가입 경로'} selectPlaceholder={'보험 가입경로를 선택하세요'} optionList={channelOption}/>

                    <SelectOptions onChangeMethod={handleChange} selectName='level' selectValue={state.level} selectRequired={true}
                                   selectLabel={'회원 등급'} selectPlaceholder={'회원 등급을 선택하세요'} optionList={customerLevel}/>

                    <Form.Item rules={[{required: true, message: '고객 ID를 입력해주세요!'}]} name="information" label="고객 부가정보" >
                        <Input name="information" value={state.information} onChange={handleChange}
                               placeholder={"고객의 부가정보를 입력해주세요"}/>
                    </Form.Item>
                    <Form.Item rules={[{required: true, message: '해당 계약 담당 직원의 ID를 입력해주세요!'}]} name="employeeId" label="담당 직원 ID" >
                        <Input name="employeeId" value={state.employeeId} onChange={handleChange} placeholder={"계약 담당 직원의 ID를 입력해주세요"}/>
                    </Form.Item>
                    <Form.Item><Button type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
                </Form>
            </Wrapper>
        )

}

export default Apply;
