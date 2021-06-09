
import React, {useEffect, useState} from "react";
import {Drawer, Button, DatePicker, Form, Row, Col, Input, InputNumber, Divider, Select, Modal} from "antd"
import '../../css/Detail.css'
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {useForm} from "antd/es/form/Form";

const UWDetail = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        status : '보상심사중',
        dateHandled: '' //todo: 아직 안 사용, 변수명
    });
    const getDate = () => {
        var getDate = new Date().toLocaleDateString();
        setState({dateHandled: getDate});
    }
    useEffect(() => {getDate();}, [])
    useEffect(() => {console.log('useEffect ',state);}, [state])

    const handleCancel = () => {
        console.log('Clicked cancel button');
        props.setVisible(false);
    };
    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({...state, [name]: value});
    }
    const handleSubmit = () => {
        postCompensation()
    }
    const postCompensation = () => {
        const url = '/api/claim/'+props.clickedRecord.id+'/status';
        console.log('url : ', url);
        axios.post(url, {
            status: state.status,
        }).then((r)=> console.log(r)
        )
    }
    return(
        <Modal title = "해당 Claim에 대한 보상을 심사합니다" width={800} visible = {props.visible} footer={null}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row>
                    <Col span={12}>
                        <Form.Item label={"사고접수 ID"}>
                            <Input  value={props.clickedRecord.id}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"daf"}>
                        {/*<Form.Item label={props.columns.find(d => d.key === 'contractId').title}>*/}
                            <Input  value={props.clickedRecord.contractId}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider style={{fontSize: '1em'}} orientation="center">확인시 해당 계약은 심사단계로 이관됩니다.</Divider>

                        {/*<Form.Item label={props.columns.find(d => d.key === 'startDate').title}>*/}
                        {/*<Form.Item label={props.columns.find(d => d.key === 'endDate').title}>*/}

                <Row>
                    <Col span={12}>
                        <Form.Item label={"계약 시작 일자"}>
                            <Input value={props.clickedRecord.contractDate.startDate}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"계약 종료 일자"}>
                            <Input value={props.clickedRecord.contractDate.endDate}/>
                        </Form.Item>
                    </Col>
                </Row><Row>
                <Col span={12}>
                    <Form.Item label={"고객 ID / 고객성명"}>
                        <Input value={props.clickedRecord.client.id}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={"보험상품 ID / 보험상품 이름"}>
                        <Input value={props.clickedRecord.insurance.id}/>
                    </Form.Item>
                </Col>
            </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" value="Submit">Submit</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default UWDetail;