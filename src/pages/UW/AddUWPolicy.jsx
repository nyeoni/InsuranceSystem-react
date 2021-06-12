import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {GeneralTable} from "../../components/GeneralTable";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Button, Col, DatePicker, Form, Input, InputNumber, Row} from "antd";

const AddUWPolicy = ({match, history}) => {
    const title = "인수정책 공지"
    const subtitle = "인수정책과 관련된 공지글을 작성하는 페이지입니다."

    const [form] = Form.useForm();
    const [state, setState] = useState({
        title: '',
        author: '현재 로그인된 ID 자동 설정',
        date: '',
        content: '',
    })

    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({...state, [name]: value});
    }
    useEffect(() => {console.log('useEffect ',state);}, [state])

    const addClaim = async () => {
        const url = '/api/';
        axios.post(url, {

        }).then((r) => {console.log(r);
            alert("API 보내기 성공");
            form.resetFields();
        }).catch((error) => {
            console.log(error.response.message);
        });
    }
    const handleSubmit = async () => {
        const data = await addClaim()
        console.log(data)
    }
    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form form = {form} labelCol={{span: 10,}} wrapperCol={{span: 14,}} size={"large"} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="employeeId" label="사고 접수 담당 직원ID" >
                    <Input name="author" disabled={true} defaultValue={state.author} onChange={handleChange} placeholder="사고 접수를 담당하고있는 직원의 ID를 입력해주세요"/>
                </Form.Item>
                <Form.Item label={'글 제목'} name="title" rules={[{required: true, message: '제목을 입력해주세요'}]}>
                    <Input style={{width:'100%'}} name="title" value={state.title} onChange={handleChange} placeholder="정책의 제목을 입력해주세요"/>
                </Form.Item>
                <Form.Item label={'정책 내용'} name="content" rules={[{required: true, message: '정책의 내용을 입력해주세요!'}]}>
                    <Input.TextArea style={{width:'100%'}} name="claimDetail" value={state.claimDetail}
                                    onChange={handleChange} placeholder="새로운 인수정책 내용을 입력해주세요!"/>
                </Form.Item>
                <Form.Item><Button type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    );
}

export default AddUWPolicy;