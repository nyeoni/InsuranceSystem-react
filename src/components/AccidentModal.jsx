
import React, {useEffect, useState} from "react";
import {Drawer, Button, DatePicker, Form, Row, Col, Input, InputNumber, Divider} from "antd"
import '../css/Detail.css'
import axios from "axios";

const AccidentModal = (props) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const style = {width:'80%'};
    useEffect(() => {
        getDate();
    }, [])
    const getDate = () => {
        var getDate = new Date().toLocaleDateString();
        setState({dateHandled: getDate});
    }
    const [state, setState] = useState({
        //todo later: 치료 병원명, 장소, (가입 상품 종류가 아니라 상품의 ID)
        compensationId: '', //보상 id
        employeeId: '', //보상 id
        employeeName: '',//직원 이름
        amount:'', // 보상액
        clientName : '', //고객성명
        type: '', //보험 종류
        dateReceipt: {}, //접수 일자
        dateHandled:'', //todo: 처리 일자
        detail:'', // todo: 사고내용
        partner:'', // todo: 협력업체 직원id
        damage: '', //todo: 손해액
        negligence: '', //todo: 과실 비율
    })

    function handleChange(event){
        // console.log(event)
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({
            ...state,
            [name]: value});
    }
    function handleSubmit(){
        postAccident()
            // .then((response) => {console.log('response, ', response.data)})
    }
    const postAccident = () => {
        // const url = 'https://60aba7e95a4de40017cca8e4.mockapi.io/compensation';
        // axios.post(url, {
        //     // compensationId: state.compensationId,
        //     employeeId: state.employeeId,
        //     employeeName: state.employeeName,
        //     // amount: state.amount,
        //     clientName: state.clientName,
        //     dateReceipt: state.dateReceipt,
        //     dateHandled: state.dateHandled,
        //     detail: state.detail,
        //     partner: state.partner,
        //     damage: state.damage,
        //     negligence: state.negligence,
        // }).then((r) => {console.log(r);
        //     setConfirmLoading(false);
        //     alert("API 보내기 성공")
        // }); todo: 사고 장소는 없애도록
    }
    const onClose = () =>{
        props.setVisible(false);
    }
    return(
        <Drawer title="사고 접수처리" visible={props.visible} width={850} onClose={onClose} footer={
            <div style={{textAlign: 'right',}}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>

                <Button  type="primary">Submit</Button>
            </div>
        }>
         {/*<Modal  confirmLoading={confirmLoading} okText={"Submit"}  onCancel={() => props.setVisible(false)} onOk={() => {handleSubmit(); setConfirmLoading(true);}} >*/}
                {Object.entries(props.clickedRecord).map(([key, value])=>{
                    return(
                        <Row>
                            <Col span={12}>
                                <Form.Item required={true} label={props.columns.find((d) => d.key===key).title}>
                                    <Input name={key} readOnly={true} value={value} disabled={true}
                                           onInput={(val)=>{handleChange({target: {name: '${key}', value: val}})}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                })}
                <Divider orientation="center">접수를 위해 정보를 입력해주세요</Divider>
            <Form layout="vertical" hideRequiredMark>
                <Row>
                    <Col span={12}>
                        <Form.Item name="name" label="사고 일자" rules={[{required: true, message: '사고가 발생한 날짜를 선택해주세요'}]}>
                            <DatePicker format={"M/DD/YYYY"} name = "dateReceipt" style={style}
                                        onChange={(val)=>{if(val !== null){handleChange({target: {name: 'dateReceipt', value: val.toLocaleDateString}})}}}/>
                        </Form.Item></Col>
                    <Col span={12}>
                        <Form.Item label={'접수된 날짜'} rules={[{required: true}]}>
                            <Input style={style} readOnly={true} name="dateHandled" value={state.dateHandled} onInput={handleChange}/></Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label={'사고 장소'} rules={[{required: true, message: '장소를 입력해주세요'}]}>
                            <Input style={style} placeholder="예시) 서울시 서대문구 거북골로 34"/></Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'치료 병원'} rules={[{required: false}]}>
                            <Input style={style} placeholder="치료 병원의 상호명을 입력해주세요"/></Form.Item>
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
                    <Col span={12}>
                        <Form.Item label={'과실 비율'} required={false}>
                            <InputNumber defaultValue={50} min={0} max={100} style={style}
                                         formatter={value => `${value}%`} parser={value => value.replace('%', '')}
                                         onChange={(val)=>{handleChange({target: {name: 'negligence', value: val}})}}
                                         placeholder="접수한 고객의 과실 비율을 입력해주세요"/></Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'손해액'} rules={[{required: true, message: '보상 청구를 위해 손해액을 입력해주세요'}]}>
                            <InputNumber placeholder="손해의 가치를 입력해주세요." style={style}
                                         defaultValue={1000000} min={0} formatter={value => `${value}원`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} step={10000}
                                         parser={value => value.replace('원'+/\$\s?|(,*)/g, '')}
                                         onChange={(val)=>{handleChange({target: {name: 'damage', value: val}})}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={'사고 내용'} rules={[{required: true, message: '사고의 정확한 내용을 기술해주세요'}]}>
                            <Input.TextArea style={{width:'100%'}} name="detail" value={state.detail} onChange={handleChange} placeholder="자세한 사고 내용을 입력해주세요"/></Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
        )
}
export default AccidentModal;