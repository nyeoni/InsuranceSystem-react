import React from "react";
import {Form, Input, Button, Select,} from 'antd';
import {Wrapper} from "../../components/Wrapper";
//특약 종류, 보험료, 위험률 ??

const Create = () => {
    const title = "상품개발"
    const subtitle = "HM 손해보험의 보험상품을 개발하기 위한 페이지입니다."
    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form labelCol={{span: 3,}} wrapperCol={{span: 10,}} layout="vertical">
                <Form.Item required={true}  label="보험상품 이름"><Input /></Form.Item>
                <Form.Item required={true} label="보험상품 ID번호"><Input /></Form.Item>
                <Form.Item required={true} label="상품 항목">
                    <Select>
                        <Select.Option value="Car">자동차 보험</Select.Option>
                        <Select.Option value="Driver">운전자 보험</Select.Option>
                        <Select.Option value="Fire">화재 보험</Select.Option>
                        <Select.Option value="Traveller">여행자 보험</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="가입 연령대" style={{ marginBottom: 0 }}>
                    <Form.Item name="minimum" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                        <Input placeholder="가입 최저 연령을 입력해주세요" />
                    </Form.Item>
                    <Form.Item name="maximum"  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                        <Input placeholder="가입 최고 연령을 입력해주세요" />
                    </Form.Item>
                </Form.Item>
                <Form.Item name="select-multiple" label="보험 가입시 요구 제출 서류" rules={[{ required: true, message: '하나 이상의 제출 서류를 선택해주세요', type: 'array' }]}>
                    <Select mode="multiple" placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">
                        <Select.Option value="driverLicense">운전면허</Select.Option>
                        <Select.Option value="driverLicense">운전자 사고 이력</Select.Option>{/*//option??*/}
                        <Select.Option value="carRegistration">자동차 등록증</Select.Option>
                        <Select.Option value="building">집 문서??ㅋ</Select.Option>
                        <Select.Option value="passport">여권사본</Select.Option>
                        <Select.Option value="flightTicket">항공 탑승권 등 여행증명서류</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['note', 'introduction']} required={true} label="보험상품 개요"><Input.TextArea /></Form.Item>
                <Form.Item required={true} requiredMark={true} label="기초 보험요율"><Input /></Form.Item>

                <Form.Item><Button htmlType="submit">Summit</Button></Form.Item>
            </Form>
        </Wrapper>
    )
}
export default Create;