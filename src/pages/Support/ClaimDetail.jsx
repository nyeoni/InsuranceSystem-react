
import React, {useEffect, useState} from "react";
import {Modal, Form, Row, Col, Divider, Input, Select, Button} from "antd"
import "../../css/Modal.css"
import axios from "axios";
import useAsync from "../../customHooks/useAsync";


//          partner
// async function getPartner() {
//     const response = await axios.get(
//         'https://60aba7e95a4de40017cca8e4.mockapi.io/partner'
//     );
//     return response.data;
// }
//partner
// const [data, setData] = useState([]);
// const settingData = (data) => {
//     if (data) {setData(data);}
//     else {console.log("데이터 설정 실패");}
// }
// const [initialState, refetch] = useAsync(getPartner, settingData, [getPartner]);
// const { loading, error } = initialState;
// if (error) {return (<div>에러가 발생하였습니다.</div>);}
//

//"status" : "보상심사중"
async function postCompensation(id, data) {
    const url = `http://hminsu.net/api/claim/${id}/status`;
    const response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    console.log(response);
    return response.data;
}

const ClaimDetail = (props) => {
    const {visible, setVisible, clickedRecord, columns} = props;
    const [form] = Form.useForm();
    const [state, setState] = useState({
        status : '보상심사중',
    });

    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({...state, [name]: value});
    }
    const handleSubmit = () => {
        postCompensation()
    }
    const postCompensation = () => {
        const url = '/api/claim/'+clickedRecord.id+'/status';
        console.log('url : ', url);
        axios.post(url, {
            status: state.status,
        }).then((r)=> console.log(r))
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
                <Divider style={{fontSize: '1em'}} orientation="center">접수된 사고는 보상심사 단계로 이관됩니다.</Divider>
                <Form {...layout} form={form} layout="horizontal" onFinish={handleSubmit}>
                    <Form.Item label={"사고접수 ID"}>
                        <Input  value={clickedRecord.id}/>
                    </Form.Item>
                    <Form.Item label={columns.find(d => d.key === 'contractId').title}>
                        <Input  value={clickedRecord.contractId}/>
                    </Form.Item>
                    <Form.Item label={'계약 시작 날짜'}>
                        <Input readOnly={true} name="dateHandled" value={state.dateHandled} onInput={handleChange}/>
                    </Form.Item>
                    <Form.Item label={columns.find(d => d.key === 'damageCost').title}>
                        <Input value={clickedRecord.damageCost}/>
                    </Form.Item>
                    <Form.Item label={columns.find(d => d.key === 'claimRate').title}>
                        <Input value={clickedRecord.claimRate}/>
                    </Form.Item>
                    <Form.Item label={columns.find(d => d.key === 'claimDetail').title}>
                        <Input.TextArea value={clickedRecord.claimDetail}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }else {return null;}

}
export default ClaimDetail;