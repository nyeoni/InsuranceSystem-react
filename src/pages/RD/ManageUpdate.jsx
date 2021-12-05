import {Button, Col, Form, Input, InputNumber, notification, Row, Select} from "antd";
import React from "react";
import {SelectOptions} from "../../components/SelectOptions";
import {post} from "../../library/apiPost";
import axios from "axios";

const ManageUpdate = (props) => {
    // todo: put insurance/{id}가 수정.
    //  조회하는 DTO 그대로, ID도 같이 보낼 필요없음 모든 값 다시 보내줘야함.
    const {id,form, newData, setNewData} = props;
    const insuranceCategory = [
        {label: '자동차보험', value: '자동차'},
        {label: '운전자보험 ', value: '운전자'},
        {label: '화재보험', value: '화재'},
        {label: '여행자보험', value: '여행'}
    ];
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setNewData({...newData, [name]: value});
    }
    const handleSubmit = async () => {
        const url = `/insurance/${id}`;
        const payload = {
            name: newData.name,
            category: newData.category,
            description: newData.description,
            conditions: {
                startAge: newData.startAge,
                endAge: newData.endAge,
                rating: newData.rating
            }
        };
        const data = await putUpdates(url, payload, form);
        console.log(data);
    }
    const putUpdates = async (url, payload, form) =>{
        return await axios( url,{
            method: 'put',
            headers: {'content-type': 'application/json'},
            data: payload,
        }).then((response) => {
            notification.open({message: 'Notification!', description: '전송 완료'});
            form.resetFields();
            return response.data.data;
        }).catch(err =>
        {console.log(err.message);});
    }
    return(
        <Form form={form} initialValues={newData} labelCol={{span: 10}} wrapperCol={{span: 14}} layout="vertical" size={"large"} onFinish={handleSubmit}        >
            <Form.Item rules={[{required: true, message: '보험의 이름을 입력해주세요!'}]} name="name" label="보험상품 이름" >
                <Input name="name" value={newData.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/>
            </Form.Item>

            <SelectOptions onChangeMethod={handleChange} selectName='category' selectValue={newData.category} selectRequired={true}
                           selectLabel={'상품 항목'} selectPlaceholder={'상품의 종류를 선택하세요'} optionList={insuranceCategory}/>

            <Row>
                <Col span={7}>
                    <Form.Item wrapperCol={12} label="가입 연령대">
                        <InputNumber style={{ display: 'inline-block', width: '45%', marginInlineEnd:'4px'}} placeholder="가입 최저 연령"
                                     min={0} max={100.00} name="startAge" value={newData.conditions?.startAge}
                                     onChange={(val)=>{handleChange({target: {name: 'startAge', value: val}});}}/>

                        <InputNumber style={{ display: 'inline-block', width: '45%'}} placeholder="가입 최고 연령"
                                     min={0} max={100.00} name="endAge" value={newData.conditions?.endAge}
                                     onChange={(val)=>{handleChange({target: {name: 'endAge', value: val}});}}/>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item wrapperCol={12} name={"rating"} label="최소 신용등급">
                        <InputNumber style={{ display: 'inline-block', width: '100%'}}
                                     min={1} max={10} step="1" name="rating" value={newData.conditions?.rating}
                                     onChange={(val)=>{handleChange({target: {name: 'rating', value: val}});}}/>
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item rules={[{required:true, message: '보험의 개괄적인 설명을 입력해주세요'}]} name={"description"} label="보험상품 개요">
                <Input.TextArea name="description" value={newData.description} onChange={handleChange}/>
            </Form.Item>

            <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
        </Form>
    )
}
export default ManageUpdate;
