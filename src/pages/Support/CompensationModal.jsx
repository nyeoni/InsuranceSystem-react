import React, {useEffect, useState} from "react";
import {Divider, Form, Input, InputNumber, Modal, Button, notification} from 'antd';
import {useForm} from "antd/es/form/Form";
import axios from "axios";

async function postCompensation(id, data) {
    const url = `/api/compensation/${id}/status`;
    const response = await axios({
        method: 'post',
        url: url,
        data: {status : data},
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        notification.open({
            message: 'Notification!',
            description: '보상처리 요청 완료'
        })
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    console.log(response);
    return response;
}

const CompensationModal = (props) => {
    const {clickedRecord, title, visible, setVisible} = props
    const [form] = useForm();
        const [state, setState] = useState({
            status : ''
            })
        const handleSubmit = async () => {
            const data = await postCompensation(clickedRecord.id, "보상완료");
            console.log(data);
        }
        function onOk(){form.submit();}
        function onCancel() {setVisible(false);}
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        if(clickedRecord){
        console.log('real clicked',clickedRecord)
        return(
            <Modal title={title + "의 추가정보"} visible= {visible} width={700} onCancel={onCancel} onOk={onOk}
                   okText={'Submit'} okButtonProps={{form:'form', key: 'submit', htmlType: 'submit'}}>
                <Form {...layout} form = {form} layout={"horizontal"} onFinish={handleSubmit}>
                    <Divider style={{fontSize: '1em'}} orientation="center">해당 보상의 상태는 자동으로 '보상완료'로 변경됩니다.</Divider>
                    <Form.Item label={"보상처리 ID"}>
                        <Input  readOnly={true}value={clickedRecord.id}/>
                    </Form.Item>
                    <Form.Item label={"고객 계약번호"}>
                        <Input  readOnly={true}value={clickedRecord.contract.id}/>
                    </Form.Item>

                    <Form.Item label={"사고접수 번호"}>
                        <Input   readOnly={true}value={clickedRecord.claim.id}/>
                    </Form.Item>
                    <Form.Item label={"손해액(KRW)"}>
                        <InputNumber style={{width : '100%'}}  readOnly={true}
                                     value={clickedRecord.cost} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} step={1000}
                                     parser={value => value.replace(/\$\s?|(,*)/g, '')}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }else{
        return null;
    }

}
export default CompensationModal;