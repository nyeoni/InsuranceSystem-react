import React from "react";
import {Form, Input, Modal} from 'antd';
import {useForm} from "antd/es/form/Form";

const InfoModal = (props) => {
    function onCancel() {
        props.setVisible(false);
    }
    return(
        <Modal title={props.title + "의 추가정보"} visible= {props.visible} onCancel={onCancel}>
            <Form labelCol={10} wrapperCol={14} layout={"vertical"}>
                <Form.Item label="보상 직원 ID">
                    <Input readOnly={true} value={props.clickedRecord.id}/>
                </Form.Item>
                <Form.Item label="보상 직원 성명">
                    <Input readOnly={true} value={props.clickedRecord.name}/>
                </Form.Item>
                {/*{Object.entries(props.clickedRecord).map(([key, value])=>{*/}
                {/*    return(*/}
                {/*        <Form.Item label={key}>*/}
                {/*            <Input readOnly={true} value={value}/>*/}
                {/*        </Form.Item>*/}
                {/*    )*/}
                {/*})}*/}

            </Form>
        </Modal>
       )
}
export default InfoModal;