import React, {useState} from "react";
import {Modal, DatePicker,Form, Input} from "antd"

const AccidentModal = (props) => {
    function onChange(date, dateString){
        console.log(date,dateString)
    };
    function handleChange(){

    }
    function handleSubmit(){
    }
    return(
        <Modal title="사고 접수처리" visible={props.visible} okText={"Submit"} onCancel={() => props.setVisible(false)} onOk={() => props.setVisible(false)} width={850}>
            <table className="ModalTable">
                <thead><tr>
                    <th>세부 항목</th>
                    <th>내용</th>
                </tr></thead>
                <tbody>
                {Object.entries(props.clickedRecord).map(([key, value])=>{
                    return(
                        <tr>
                            <td key={key}>{key}</td>
                            <td><Form.Item required={true}><Input bordered={false} readOnly={true} value={value}/></Form.Item></td>
                        </tr>
                    )
                })}
                <tr>
                    <td>사고일시</td>
                    <td><Form.Item required={true}><DatePicker bordered={false}onChange={onChange}/></Form.Item></td>
                </tr>
                <tr>
                    <td>장소</td>
                    <td><Form.Item required={true}><Input style={{width: '100%'}} onChange={handleChange}bordered={false} placeholder="예시) 서울시 서대문구 거북골로 34"/></Form.Item></td>
                </tr>
                <tr>
                    <td>사고 내용</td>
                    <td><Form.Item required={true}><Input.TextArea style={{width: '100%'}} onChange={handleChange} bordered={false} placeholder="자세한 사고 내용을 입력해주세요"/></Form.Item></td>
                </tr>
                <tr>
                    <td>현장업체 소견</td>
                    <td><Form.Item required={false}><Input style={{width: '100%'}} onChange={handleChange}bordered={false} placeholder="간단한 사고 조치 내용을 입력해주세요"/></Form.Item></td>
                </tr>
                <tr>
                    <td>과실 비율</td>
                    <td><Form.Item required={false}><Input style={{width: '100%'}} onChange={handleChange}bordered={false} placeholder="접수한 고객의 과실 비율을 입력해주세요"/></Form.Item></td>
                </tr>
                <tr>
                    <td>치료 병원명</td>
                    <td><Form.Item required={false}><Input style={{width: '100%'}} onChange={handleChange} bordered={false} placeholder="치료 병원의 상호명을 입력해주세요"/></Form.Item></td>
                </tr>
                <tr>
                    <td>손해액</td>
                    <td><Form.Item required={true}><Input style={{width: '100%'}} onChange={handleChange} bordered={false} placeholder="손해의 가치를 입력해주세요."/></Form.Item></td>
                </tr>
                <tr>
                    <td>사고 현장파견 직원</td>
                    <td><Form.Item required={false}><Input className={"accidentInput"} onChange={handleChange} bordered={false} placeholder="현장에 파견된 직원의 ID를 입력해주세요"/></Form.Item></td>
                </tr>
                </tbody>
            </table>
        </Modal>
        )
}
export default AccidentModal;