import React from "react";
import {Form, Input, Modal} from 'antd';

const InfoModal = (props) => {
    return(
        <Modal title={"asdf"} visible= {props.visible}>
            <Form labelCol={8} wrapperCol={16}>
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