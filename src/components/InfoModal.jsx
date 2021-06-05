import React from "react";
import {Form, Input, Modal} from 'antd';
import "../css/Modal.css"


function InfoModal(clickedRecord) {
    return(
        Modal.info({
            title: "세부 내용",
            content: (
                <Form labelCol={8} wrapperCol={16}>
                    {Object.entries(clickedRecord.employee).map(([key, value])=>{
                        return(
                            <Form.Item label={key}>
                                <Input readOnly={true} value={value}/>
                            </Form.Item>
                        )
                    })
                    }
                </Form>
            ),
            onOk(){}
        })
    )
}
export default InfoModal;