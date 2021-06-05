
import React, {useEffect, useState} from "react";
import {Modal, Form, Row, Col, Divider, Input, Select, Button} from "antd"
import "../../css/Modal.css"
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
async function getPartner() {
    const response = await axios.get(
        'https://60aba7e95a4de40017cca8e4.mockapi.io/partner'
    );
    return response.data;
}
const ClaimDetail = (props) => {
    // const style = {width:'90%', marginLeft: '4%'};
    const [state, setState] = useState({
        status : '',
        dateHandled: ''
    });
    const getDate = () => {
        var getDate = new Date().toLocaleDateString();
        setState({dateHandled: getDate});
    }
    useEffect(() => {getDate();}, [])
    useEffect(() => {console.log('useEffect ',state);}, [state])
    const [confirmLoading, setConfirmLoading] = React.useState(false);

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
        setConfirmLoading(true);
        setTimeout(() => {
            props.setVisible(false);
            setConfirmLoading(false);
        }, 1000);
        //
        // postInsurance()
    }
    const postInsurance = () => {
        const url = 'https://60aba7e95a4de40017cca8e4.mockapi.io/claim';
        axios.post(url, {
            status: state.status,
        })
    }

    return (
        <Modal title = "해당 Claim에 대한 보상을 심사합니다" width={800} visible = {props.visible} confirmLoading={confirmLoading}
               footer={[
                   <Button htmlType="submit" value={'Submit'}>Submit</Button>,
                   <Button onClick={handleCancel}>Cancel</Button>
               ]}>
            <Form layout="vertical" onFinish={handleSubmit}>
                <Row>
                    <Col span={12}>
                        <Form.Item label={"사고접수 ID"}>
                            <Input  value={props.clickedRecord.id}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={props.columns.find(d => d.key === 'contractId').title}>
                            <Input  value={props.clickedRecord.contractId}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider style={{fontSize: '1em'}} orientation="center">접수된 사고는 보상심사 단계로 이관됩니다.</Divider>
                <Row>
                    <Col span={24}>
                        <Form.Item label={'접수 처리 날짜'}>
                            <Input readOnly={true} name="dateHandled" value={state.dateHandled} onInput={handleChange}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label={props.columns.find(d => d.key === 'damageCost').title}>
                            <Input value={props.clickedRecord.damageCost}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={props.columns.find(d => d.key === 'claimRate').title}>
                            <Input value={props.clickedRecord.claimRate}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={props.columns.find(d => d.key === 'claimDetail').title}>
                            <Input.TextArea value={props.clickedRecord.claimDetail}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="협력 업체">
                            <Select mode={"multiple"} value={state.type}
                                    onChange={(val)=>{handleChange({target: {name: 'type', value: val}})}}>
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
        </Modal>
    )
}
export default ClaimDetail;