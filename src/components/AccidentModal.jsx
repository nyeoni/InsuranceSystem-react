
import React, {useEffect, useState} from "react";
import {Drawer, Button, DatePicker, Form, Row, Col, Input, InputNumber, Divider, Select} from "antd"
import '../css/Detail.css'
import axios from "axios";
import useAsync from "../customHooks/useAsync";

async function getPartner() {
    const response = await axios.get(
        'https://60aba7e95a4de40017cca8e4.mockapi.io/partner'
    );
    return response.data;
}

const AccidentModal = (props) => {
    const style = {width:'90%', marginLeft: '4%'};

    useEffect(() => {getDate();}, [])
    const getDate = () => {
        var getDate = new Date().toLocaleDateString();
        setState({dateHandled: getDate});
    }
    const [state, setState] = useState({
        //todo: (가입 상품 종류가 아니라 상품의 ID)
        // claimId: '',
        // employeeName: '',
        // clientName : '',
        // contractId : '',
        // employeeId : '',
        // accidentDate: '',
        // receiptDate: '',
        // hospitalStatement: '',
        // damageCost: '',
        // claimPartner: [],
        // negligence: '', //todo: 과실 비율
        // status: '보상심사중',
    })
    //partner
    const [data, setData] = useState([]);
    const settingData = (data) => {
        if (data) {setData(data);}
        else {console.log("데이터 설정 실패");}
    }
    const [initialState, refetch] = useAsync(getPartner, settingData, [getPartner]);
    const { loading, error } = initialState;
    if (error) {return (<div>에러가 발생하였습니다.</div>);}
    //
    function handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        console.log('val ', value)
        setState({...state, [name]: value});
    }
    function handleSubmit(){
        postAccident()
    }
    const postAccident = () => {
        const url = 'https://60aba7e95a4de40017cca8e4.mockapi.io/compensation';
        axios.post(url, {
            // compensationId: state.compensationId,
            employeeId: state.employeeId,
            employeeName: state.employeeName,
            // amount: state.amount,
            clientName: state.clientName,
            dateReceipt: state.dateReceipt,
            receiptDate: state.dateHandled,
            hospitalStatement: state.hospitalStatement,
            damageCost: state.damageCost,
            claimPartner: state.claimPartner,
            negligence: state.negligence,
            status: state.status,
        }).then((r) => {console.log(r);
            alert("API 보내기 성공")
        });
    }
    const onClose = () =>{props.setVisible(false)}
    return(
        <Drawer title="사고 접수처리" visible={props.visible} width={700} onClose={onClose} footer={
            <div style={{textAlign: 'right',}}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>

                <Button htmlType="submit" value="Submit" type="primary">Submit</Button>
            </div>
        }>
            <Form layout="vertical" onFinish={handleSubmit}>
                {Object.entries(props.clickedRecord).map(([key, value])=>{
                    return(
                        <Row gutter={[8,8]}>
                            <Col span={24}>
                                <Form.Item labelCol={{span: 4}} wrapperCol={{span: 20}} required={true} label={props.columns.find((d) => d.key===key).title}>
                                    <Input size={'small'} name={key} readOnly={true} value={value} disabled={true}
                                           onInput={(val)=>{handleChange({target: {name: '${key}', value: val}})}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                })}
                <Divider orientation="center">접수를 위해 추가적인 정보를 입력해주세요</Divider>
                <Row>
                    <Col span={12}>
                        <Form.Item label={'접수 처리된 날짜'} required={true}>
                            <Input style={style} readOnly={true} name="dateHandled" value={state.dateHandled} onInput={handleChange}/></Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'병원 진단내용'} required={false}>
                            <Input style={style} placeholder="병원의 진단 내용을 입력해주세요"/></Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label={'사고 현장파견 직원'} required={false}>
                            <Input name="partner" value={state.partner} style={style}
                                   onChange={handleChange} placeholder="현장에 파견된 직원의 ID를 입력해주세요"/></Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'현장업체 소견'} required={false}>
                            <Input style={style} placeholder="간단한 사고 조치 내용을 입력해주세요"/></Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="협력 업체" required={false}>
                            <Select mode={"multiple"} value={state.type} style={{marginLeft:'2%', width:'95%'}} onChange={(val)=>{handleChange({target: {name: 'type', value: val}})}}>
                                {data.map((v) => {
                                    return(
                                        <Select.Option key={v.id} value={v.id}>{v.partnerName}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
        )
}
export default AccidentModal;