import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {Button, Row, Col, Form, Input, InputNumber, Select, Spin, Statistic, Tabs, Progress, notification} from "antd";
import styled from "styled-components";
import {apiCall} from "../../library/ApiCall";
import useAxios from "../../swr/useAxios";
import {SelectOptions} from "../../components/SelectOptions";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: space-around;
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-right: 3px;
    padding-left: 3px;
    margin-top: 2rem;
    background-color: white;
`;

const ManageModify = ({match}) => {
    const { id } = match.params;
    const [form] = Form.useForm();
    const url = `/insurance/${id}`;
    const insuranceCategory = [
        {label: '자동차보험', value: '자동차'},
        {label: '운전자보험 ', value: '운전자'},
        {label: '화재보험', value: '화재'},
        {label: '여행자보험', value: '여행'}
    ];

    const { data: insurance, isLoading, isError } = useAxios(url, "get");
    const [updateData, setUpdateData] = useState({...insurance});

    useEffect(() => {console.log(updateData)}, [updateData]);

    if (isError) return <div>에러가 발생했습니다</div>;
    if (!insurance || isLoading) {
        return(<Wrapper>
                <Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/>
            </Wrapper>);
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;
        if(typeof value === 'string'){
            setUpdateData({...updateData, [name]: value});
        } else if(name === 'conditions') {
            setUpdateData({
                ...updateData,
                conditions: {...updateData.conditions,
                [Object.keys(value)[0]]: Object.values(value)[0]}
            })
        }
    }
    const handleSubmit = async () =>{
        const payload = {...updateData};
        const data = apiCall(url, 'put', {...updateData}, form);
        console.log(data);
    }
//exception
    if (isError) {return <div>에러가 발생하였습니다.</div>;}
    if (isLoading) {return <div>Loading</div>;}

    return(
        <Wrapper title={insurance.name} underline={false}>
            <Form form={form} initialValues={updateData} labelCol={{span: 10}} wrapperCol={{span: 14}} layout="vertical" size={"large"} onFinish={handleSubmit}>
                <Form.Item rules={[{required: true, message: '보험의 이름을 입력해주세요!'}]} name="name" label="보험상품 이름" >
                    <Input name="name" value={updateData.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/>
                </Form.Item>

                <SelectOptions onChangeMethod={handleChange} selectName='category' selectValue={updateData.category} selectRequired={true}
                               selectLabel={'상품 항목'} selectPlaceholder={'상품의 종류를 선택하세요'} optionList={insuranceCategory}/>

                <Row>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label="가입 연령대">
                            <InputNumber style={{ display: 'inline-block', width: '45%', marginInlineEnd:'4px'}} placeholder="가입 최저 연령"
                                         min={0} max={100.00} name="startAge" value={updateData.conditions.startAge}
                                         onChange={(val)=>{handleChange({target: {name: 'conditions', value: {startAge: val}}});}}/>

                            <InputNumber style={{ display: 'inline-block', width: '45%'}} placeholder="가입 최고 연령"
                                         min={0} max={100.00} name="endAge" value={updateData.conditions.endAge}
                                         onChange={(val)=>{handleChange({target: {name: 'conditions', value: {endAge: val}}});}}/>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} name={"rating"} label="최소 신용등급">
                            <InputNumber style={{ display: 'inline-block', width: '100%'}}
                                         min={1} max={10} step="1" name="rating" value={updateData.conditions.rating}
                                         onChange={(val)=>{handleChange({target: {name: 'conditions', value: {rating: val}}});}}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item rules={[{required:true, message: '보험의 개괄적인 설명을 입력해주세요'}]} name={"description"} label="보험상품 개요">
                    <Input.TextArea name="description" value={updateData.description} onChange={handleChange}/>
                </Form.Item>

                <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    )
}

export default ManageModify;
