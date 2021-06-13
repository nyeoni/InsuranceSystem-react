import React, {useEffect, useState} from "react";
import {Divider, Form, Input, InputNumber, Modal, Button} from 'antd';
import {useForm} from "antd/es/form/Form";
import axios from "axios";

async function postCompensation(id, data, setConfirmLoading) {
    const url = `http://hminsu.net/api/compensation/${id}/status`;
    const response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        setConfirmLoading(false);
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    console.log(response);
    return response.data;
}

const CompensationModal = (props) => {
    const {clickedRecord, title, visible, setVisible} = props
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [form] = useForm();
        const [state, setState] = useState({
            status : '보상완료'
            })

        const handleSubmit = async () => {
            const data = await postCompensation(clickedRecord.id, state, setConfirmLoading);
            console.log(data);
        }
        function onOk(){
            setConfirmLoading(true);
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
            }, 2000);
            form.submit();
        }
        function onCancel() {
            setVisible(false);
        }
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
    if(clickedRecord){
        console.log('real clicked',clickedRecord)
        return(
            <Modal title={title + "의 추가정보"} confirmLoading={confirmLoading} visible= {visible} width={700} onCancel={onCancel} onOk={onOk}
                   okText={'Submit'} okButtonProps={{form:'form', key: 'submit', htmlType: 'submit'}}>
                <Form {...layout} form = {form} layout={"horizontal"} onFinish={handleSubmit}>
                    <Divider style={{fontSize: '1em'}} orientation="center">해당 보상의 상태는 자동으로 '보상완료'로 변경됩니다.</Divider>
                    <Form.Item label={"보상처리 ID"}>
                        <Input bordered={false} readOnly={true}value={clickedRecord.id}/>
                    </Form.Item>
                    <Form.Item label={"고객 계약번호"}>
                        <Input bordered={false} readOnly={true}value={clickedRecord.contract.id}/>
                    </Form.Item>

                    <Form.Item label={"사고접수 번호"}>
                        <Input  bordered={false} readOnly={true}value={clickedRecord.claim.id}/>
                    </Form.Item>
                    <Form.Item label={"손해액(KRW)"}>
                        <InputNumber style={{width : '100%'}} bordered={false} readOnly={true}
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