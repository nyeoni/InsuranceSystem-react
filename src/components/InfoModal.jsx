import React from "react";
import {Divider, Form, Input, Modal} from 'antd';
import {useForm} from "antd/es/form/Form";

const InfoModal = (props) => {
    const{clickedRecord, title, setVisible, visible} = props;
    function onCancel() {
        setVisible(false);
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    if(clickedRecord){
        return(
            <Modal title={title + "의 추가정보"} visible= {visible} onCancel={onCancel} width={700}>
                <Form {...layout} layout={"horizontal"}>
                    <Form.Item label="보상 직원 ID">
                        <Input readOnly={true} bordered={false} value={clickedRecord.id}/>
                    </Form.Item>
                    <Form.Item label="보상 직원 성명">
                        <Input readOnly={true} bordered={false}  value={clickedRecord.name}/>
                    </Form.Item>
                    <Form.Item label={"보상 직원 연락처"}>
                        <Input readOnly={true} bordered={false} readOnly={true}value={clickedRecord.phoneNumber}/>
                    </Form.Item>
                    <Form.Item label={"보상 직원 E-Mail"}>
                        <Input readOnly={true} bordered={false} readOnly={true}value={clickedRecord.email}/>
                    </Form.Item>
                    {/*<Form.Item label={"보상 처리 이력"}>*/}
                        {/*{clickedRecord.contractList.map((data, i) =>*/}
                        {/*    <span>{data} <Divider type="horizontal" /></span>*/}
                        {/*)}*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        )
    }else{return null;}

}
export default InfoModal;