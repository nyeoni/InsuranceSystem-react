import React, {useState} from "react";
import {Col, Divider, Form, Input, InputNumber, Modal, Row} from 'antd';
import {useForm} from "antd/es/form/Form";
import useAsync from "../customHooks/useAsync";
import axios from "axios";
//http://hminsu.net/api/employee/compensation

// async function getEmployee() {
//     const response = await axios.get(
//         '/api/insurance'
//     );
//     return response.data.data;
// }

const EvaluationModal = (props) => {
    const{clickedRecord, setVisible, visible} = props;
    function onCancel() {
        setVisible(false);
    }
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const totalCompensation =  () => {
        let total = 0;
        clickedRecord.compensationList?.forEach(a => {
            total+= a.cost;
        });
        return total;
    }
    if(clickedRecord){
        console.log(clickedRecord)
        return(
            <Modal title={"직원 보상 내역"} visible= {visible} onCancel={onCancel} width={700}>
                <Form {...layout} layout={"horizontal"}>
                    <Form.Item label="보상 직원 ID">
                        <Input readOnly={true}  value={clickedRecord.id}/>
                    </Form.Item>
                    <Form.Item label="보상 직원 성명">
                        <Input readOnly={true}   value={clickedRecord.name}/>
                    </Form.Item>
                    <Form.Item label={"보상 직원 연락처"}>
                        <Input readOnly={true}  readOnly={true}value={clickedRecord.phoneNumber}/>
                    </Form.Item>
                    <Form.Item label={"보상 직원 E-Mail"}>
                        <Input readOnly={true}  readOnly={true}value={clickedRecord.email}/>
                    </Form.Item>
                    <Divider orientation={"horizontal"}>보상 처리 이력</Divider>
                    <Row gutter={[16, 24]}>
                        <Col span={8}><div>처리한 보상 ID</div></Col>
                        <Col span={8}><div>보상금액(KRW)</div></Col>
                        <Col span={8}><div>처리 상태</div></Col>
                    </Row>
                    {clickedRecord.compensationList?.map((data, i) =>
                        <>
                            <hr/>
                            <Row gutter={[16, 24]}>
                                <Col span={8}>{data.id}</Col>
                                <Col span={8}>{data.cost}원</Col>
                                <Col span={8}>{data.status}</Col>
                            </Row>
                        </>
                        )}
                    <Divider style={{marginTop:'5px'}} orientation={"horizontal"}></Divider>
                    <Form.Item label={"총 보상액 합계(KRW)"}>
                        <InputNumber style={{width : '100%'}} value={totalCompensation()} bordered={false} readOnly={true}
                                     formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }else{return null;}

}
export default EvaluationModal;