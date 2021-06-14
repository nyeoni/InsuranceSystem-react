
import React, {useEffect, useState} from "react";
import {Modal, Form, Row, Col, Divider, Input, Select, notification} from "antd"
import "../../css/Modal.css"
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {useForm} from "antd/es/form/Form";


async function getPartner() {
    const response = await axios.get(
        '/api/partner'
    );
    return response.data.data;
}

async function postCompensation(id, data) {
    const url = `/api/claim/${id}/partner`;
    const response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        notification.open({
            message: 'Notification!',
            description: '사고정보 전송 완료'
        })
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    console.log(response);
    return response;
}

const AddPartnerModal = (props) => {
    const {visible, setVisible, clickedRecord} = props;
    const [form] = Form.useForm();
    const [state, setState] = useState({
        partnerId : '',
    });
    const [data, setData] = useState([]);
    const settingData = (data) => {
        if (data) {setData(data);}
        else {console.log("데이터 설정 실패");}
    }
    const [initialState, refetch] = useAsync(getPartner, settingData, [getPartner]);
    const { loading, error } = initialState;
    if (error) {return (<div>에러가 발생하였습니다.</div>);}

    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({...state, [name]: value});
    }
    const handleSubmit = async () => {
        const data = await postCompensation(clickedRecord.id, state);
        console.log('data: ', data);
    }

    function onOk(){
        form.submit();
    }
    function onCancel() {
        setVisible(false);
    }
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    if(clickedRecord){
        return (
            <Modal title = "해당 Claim에 대한 보상을 심사합니다" width={700} visible = {visible} onCancel={onCancel} onOk={onOk}
                   okText={'Submit'} okButtonProps={{form:'form', key: 'submit', htmlType: 'submit'}}>
                <Divider style={{fontSize: '1em'}} orientation="center">사고 처리한 협력업체를 추가합니다.</Divider>
                <Form {...layout} form={form} layout="horizontal" onFinish={handleSubmit}>
                    <Form.Item label={"사고접수 ID"}>
                        <Input readOnly={true} value={clickedRecord.id}/>
                    </Form.Item>
                    <Form.Item label={"계약 고객 ID"}>
                        <Input readOnly={true} value={clickedRecord.contract.clientId}/>
                    </Form.Item>
                    <Form.Item label={"사고 상세내용"}>
                        <Input.TextArea readOnly={true} value={clickedRecord.claimDetail}/>
                    </Form.Item>
                    <Form.Item rules={[{required: true, message: '협력 업체를 선택해주세요!'}]} name='partnerId' label="협력 업체 선택">
                    <Select style={{width:'95%'}} value={state.partnerId} placeholder={"사고 조치에 협력한 업체를 선택해주세요.'"}
                            onChange={(val)=>{
                                handleChange({target: {name: 'partnerId', value: val}})
                            }}>
                        {Object.entries(data.map((v)=>{
                            return(<Select.Option value={v.id}>{v.id}: {v.name}</Select.Option>)
                        }))}
                    </Select>
                </Form.Item>
                </Form>
            </Modal>
        )
    }else {return null;}

}
export default AddPartnerModal;