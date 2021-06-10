
import React, {useEffect, useState} from "react";
import {Drawer, Button, DatePicker, Form, Row, Col, Input, InputNumber, Divider, Select, Modal, Spin} from "antd"
import '../../css/Detail.css'
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {useForm} from "antd/es/form/Form";
import {Wrapper} from "../../components/Wrapper";
async function getContract(id) {
    const response = await axios.get(
        `https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/contract/${id}`
    );
    return response.data;
}
const UWDetail = (props) => {
    const { id } = props.match.params;
    const [form] = Form.useForm();
    const [newData, setNewData] = useState({});
    const [state] = useAsync(() => getContract(id), setNewData,[id]);
    const { loading, data: contract, error } = state;
    console.log('newdata', newData);
    if (error) return <div>에러가 발생했습니다</div>;
    if (!contract || loading) {
        return(
            <Wrapper>
                <Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/>
            </Wrapper>
        );
    }
    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if(Array.isArray(value)){
            setNewData({
                ...newData,
                [name] : [...value]
            });
            console.log('array val', value)
        }else{
            setNewData({
                ...newData,
                [name]: value});
            console.log('single val', value)
        }
    }

    // useEffect(() => {console.log('useEffect ',state);}, [state])

    const handleSubmit = () => {
        postCompensation()
    }
    const postCompensation = () => {

    }
    if (newData !== null){

    return(
        <Wrapper title={"해당 고객의 신청을 인수심사합니다."} subtitle={"계약의 status가 인수심사중으로 바뀌게 됩니다."} underline={true}>
            <Form labelCol={{span: 10,}} wrapperCol={{span: 14,}} layout="vertical" size={"large"} onFinish={handleSubmit}>
                <Form.Item label="Contract ID" >
                    <Input style={{width:'95%'}} readOnly={true} value={state.data.id}/>
                </Form.Item>
                <Row>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label={"계약 신청인 ID"}>
                            <Input style={{width:'90%'}} readOnly={true} value={state.data.client.id}/>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label={"계약 신청인 성명"}>
                            <Input style={{width:'90%'}} readOnly={true} value={state.data.client.name}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label="주민등록번호 앞자리">
                            <InputNumber readOnly={true} style={{ display: 'inline-block', width: '90%', marginInlineEnd:'4px'}}
                                         value={state.data.client.rrn.rrnFront}/>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label="주민등록번호 뒷자리">
                            <InputNumber readOnly={true} style={{ display: 'inline-block', width: '90%'}}
                                         value={state.data.client.rrn.rrnBack}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider style={{fontSize: '1em'}} orientation="left">고객계약 내용, 확인시 해당 계약은 심사단계로 이관됩니다.</Divider>
                <Row>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label={"보험 ID"}>
                            <Input readOnly={true} style={{width:'90%'}} value={state.data.insurance.id}/>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label={"보험 이름"}>
                            <Input readOnly={true} style={{width:'90%'}} value={state.data.insurance.name}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label={"보험 종류"}>
                    <Input readOnly={true} style={{width:'95%'}} value={state.data.insurance.category}/>
                </Form.Item>
                <Form.Item label={"보험 내용"}>
                    <Input readOnly={true} style={{width:'95%'}} value={state.data.insurance.description}/>
                </Form.Item>
                <Form.Item label={"계약 상태"}>
                    <Input readOnly={true} style={{width:'95%'}} value={state.data.status}/>
                </Form.Item>
                <Form.Item>
                    <Button style={{marginBottom:'10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button>
                </Form.Item>
            </Form>
        </Wrapper>
    )
    }

}
export default UWDetail;