import React from "react";
import {Form, Input, Modal} from 'antd';
import {useForm} from "antd/es/form/Form";

const InfoModal = (props) => {
    const [form] = useForm();
    function onCancel() {
        props.setVisible(false);
    }

    return(
        <Modal title={props.title + "의 추가정보"} visible= {props.visible} onCancel={onCancel}>
            <Form form = {form} labelCol={10} wrapperCol={14} layout={"vertical"}>
                {Object.entries(props.clickedRecord).map(([key, value])=>{
                    return(
                        <Form.Item label={key}>
                            <Input readOnly={true} value={value}/>
                        </Form.Item>
                    )
                })}

            </Form>
        </Modal>
       )
}
export default InfoModal;