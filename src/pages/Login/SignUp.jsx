import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Modal, Button} from 'antd';
import {SelectOptions} from '../../components/SelectOptions';
import {post} from "../../library/apiPost";

const SignUp = (props) => {
    const {visible, setVisible} = props;
    const [state, setState] = useState({
        loginId: '',
        password: '',
        name: '',
        department: '',
        companyPosition: '',
        email: '',
        phoneNumber: ''
    })

    const departmentOptions = [
        {label: '개발', value: '개발'},
        {label: '영업', value: '영업'},
        {label: 'UW', value: 'UW'},
        {label: '보상', value: '보상'},
        {label: '관리', value: '관리'},
    ]
    const positionOptions = [
        {label: '사장', value: '사장'},
        {label: '상무', value: '상무'},
        {label: '부장', value: '부장'},
        {label: '차장', value: '차장'},
        {label: '과장', value: '과장'},
        {label: '대리', value: '대리'},
        {label: '사원', value: '사원'},
        {label: '인턴', value: '인턴'},

    ]

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    }
    useEffect(() => {
        // console.log('useEffect ',state);
    }, [state])

    const handleSubmit = async () =>{
        // const url = '/join';
        const payload = {...state}
        // const data = await post(url, payload);
        console.log(payload)
        closeModal();
    }

    const closeModal = () => {setVisible(false);}
    return(
            <Modal title={'회원정보 입력'} centered
                   width={'600px'}
                   visible={visible}
                   onCancel={closeModal}

                   footer={[
                       <Button key={'close'} onClick={closeModal}>닫기</Button>,
                       <Button key={'submit'} type={'primary'} onClick={handleSubmit}>회원가입 신청</Button>
                   ]}
            >
                <Form id={'signUpForm'} onFinish={handleSubmit}
                      labelCol={{span: 4}} wrapperCol={{span: 20}} layout="horizontal"
                >
                    <Form.Item label={'Login ID'} labelAlign={"right"} required={true}>
                        <Input name='loginId' value={state.loginId} onChange={handleChange} placeholder='로그인에 사용할 아이디를 입력하세요.'/>
                    </Form.Item>

                    <Form.Item label={'password'} labelAlign={"right"}>
                        <Input.Password name={'password'} value={state.password} onChange={handleChange} placeholder={'비밀번호를 설정하세요.'}/>
                    </Form.Item>

                    <Form.Item label={'Username'} labelAlign={"right"}>
                        <Input name='name' value={state.name} onChange={handleChange} placeholder='사용자의 성명을 입력하세요.'/>
                    </Form.Item>

                    <SelectOptions onChangeMethod={handleChange} selectName='department' selectValue={state.department} selectRequired={false}
                                   selectLabel={'소속 부서'} selectPlaceholder={'소속된 부서를 선택하세요'} optionList={departmentOptions}/>

                    <SelectOptions onChangeMethod={handleChange} selectName='companyPosition' selectValue={state.companyPosition} selectRequired={false}
                                   selectLabel={'직급'} selectPlaceholder={'직급을 선택하세요'} optionList={positionOptions}/>

                    <Form.Item label={'Email'} labelAlign={"right"}>
                        <Input type={'email'} name='email' value={state.email} onChange={handleChange} placeholder='사용자의 Email 입력하세요.'/>
                    </Form.Item>

                    <Form.Item label={'연락처'} labelAlign={"right"}>
                        <Input name='phoneNumber' value={state.phoneNumber} onChange={handleChange} placeholder='사용자의 연락처를 입력하세요.'/>
                    </Form.Item>
                </Form>

            </Modal>
    )
}
export default SignUp;
