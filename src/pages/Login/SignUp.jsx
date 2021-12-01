import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

async function postSignUp(signUpData) {
    const url = '/join';
    const response = await axios({
        method: 'post',
        url: url,
        data: {...signUpData,},
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    return response;
}

const SignUp = (props) => {
    const formRef = useRef(null);
    const [signUpData, setSignUpData] = useState({
        loginId: '',
        password: '',
        name: '',
        department: '',
        companyPosition: '',
        email: '',
        phoneNumber: ''
    })


    const handleChange = (event) => {
        setSignUpData((signUpData) => ({
            ...signUpData,
            [event.target.name]: event.target.value,
        }));
    }
    useEffect(() => {
        console.log('useEffect ',signUpData);
    }, [signUpData])


    async function handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const data = await postSignUp(signUpData);
            formRef.current.reset();
        }
    }

    const closeModal = () => {props.setVisible(false);}
    return(
            <Modal show={props.visible} onHide={closeModal} backdrop="static" keyboard={false} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Form ref={formRef} id="signUpForm" onSubmit={handleSubmit}>
                       <Form.Group className="mb-3" controlId="formId">
                           <Form.Label>Login ID</Form.Label>
                           <Form.Control name={'loginId'} value={signUpData.loginId} onChange={handleChange} required
                                         type="text" placeholder="Login에 사용할 ID" />
                       </Form.Group>

                       <Form.Group className="mb-3" controlId="formPassword">
                           <Form.Label>Password</Form.Label>
                           <Form.Control name={'password'} value={signUpData.password} onChange={handleChange} required
                               type="password" placeholder="Password" />
                       </Form.Group>

                       <Form.Group className="mb-3" controlId="formName">
                           <Form.Label>Username</Form.Label>
                           <Form.Control name={'name'} value={signUpData.name} onChange={handleChange} required
                               type="text" placeholder="성명" />
                       </Form.Group>

                       <Form.Group className="mb-3" controlId="formDepartmentSelect">
                           <Form.Label>Department</Form.Label>
                           <Form.Control name={'department'} value={signUpData.department} onChange={handleChange} required
                               as={"select"}>
                               <option>소속 부서를 선택하세요</option>
                               <option value="개발">개발</option>
                               <option value="영업">영업</option>
                               <option value="보상">보상</option>
                           </Form.Control>
                       </Form.Group>

                       <Form.Group className="mb-3" controlId="formPositionSelect">
                           <Form.Label>Position</Form.Label>
                           <Form.Control name={'companyPosition'} value={signUpData.companyPosition} onChange={handleChange} required
                                         as={"select"}>
                               <option>직급을 선택하세요</option>
                               <option value="사장">사장</option>
                               <option value="상무">상무</option>
                               <option value="인턴">인턴</option>
                           </Form.Control>
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="formEmail">
                           <Form.Label>Email Address</Form.Label>
                           <Form.Control name={'email'} value={signUpData.email} onChange={handleChange} required
                                         type="email" placeholder="example12@xmail.com" />
                       </Form.Group>

                       <Form.Group className="mb-3" controlId="formPhoneNumber">
                           <Form.Label>연락처</Form.Label>
                           <Form.Control name={'phoneNumber'} value={signUpData.phoneNumber} onChange={handleChange} required
                                         type="text" placeholder="개인 연락처를 입력하세요" />
                       </Form.Group>
                   </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>취소</Button>
                    <Button type={"submit"} form={"signUpForm"} variant="primary">회원가입 신청</Button>
                </Modal.Footer>
            </Modal>
    )
}
export default SignUp;
