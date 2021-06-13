import React from "react";
import {Divider, Form, Input, Modal} from 'antd';
import {useForm} from "antd/es/form/Form";

const PartnerModal = (props) => {
    const{clickedRecord, title, setVisible, visible} = props;
    function onCancel() {
        setVisible(false);
    }
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    if(clickedRecord){
        return(
            <Modal title={title + "의 추가정보"} visible= {visible} onCancel={onCancel} width={700}>
                <Form {...layout} layout={"horizontal"}>
                    <Form.Item label="협력업체 ID">
                        <Input readOnly={true}  value={clickedRecord.id}/>
                    </Form.Item>
                    <Form.Item label="업체명">
                        <Input readOnly={true}   value={clickedRecord.name}/>
                    </Form.Item>
                    <Form.Item label={"업체 주소"}>
                        <Input readOnly={true}  readOnly={true}value={clickedRecord.address}/>
                    </Form.Item>
                    <Form.Item label={"협력업체 연락처"}>
                        <Input readOnly={true}  readOnly={true}value={clickedRecord.contactNumber}/>
                    </Form.Item>
                    <Divider orientation={"horizontal"}>보상 처리 이력</Divider>
                        {clickedRecord.claimList?.map((data, i) =>
                            <Form.Item label={data.id}>
                                <Input readOnly={true}  readOnly={true}value={data.cost}/>
                            </Form.Item>
                            // <span>{data} <Divider type="horizontal" /></span>
                        )}
                </Form>
            </Modal>
        )
    }else{return null;}

}
export default PartnerModal;