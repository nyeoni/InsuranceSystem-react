import React, {useEffect, useState} from "react";
import {Modal, DatePicker,Form, Input, InputNumber} from "antd"
import axios from "axios";

const AccidentModal = (props) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    useEffect(() => {
        getDate();
    }, [])
    const getDate = () => {
        var getDate = new Date().toLocaleDateString();
        setState({dateHandled: getDate});
    }
    const [state, setState] = useState({
        //todo later: 치료 병원명, 장소, (가입 상품 종류가 아니라 상품의 ID)
        compensationId: '', //보상 id
        employeeId: '', //보상 id
        employeeName: '',//직원 이름
        amount:'', // 보상액
        clientName : '', //고객성명
        type: '', //보험 종류
        dateReceipt: {}, //접수 일자
        dateHandled:'', //todo: 처리 일자
        detail:'', // todo: 사고내용
        partner:'', // todo: 협력업체 직원id
        damage: '', //todo: 손해액
        negligence: '', //todo: 과실 비율
    })

    function handleChange(event){
        // console.log(event)
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({
            ...state,
            [name]: value});
    }
    function handleSubmit(){
        postAccident()
            // .then((response) => {console.log('response, ', response.data)})
    }
    const postAccident = () => {
        const url = 'https://60aba7e95a4de40017cca8e4.mockapi.io/compensation';
        axios.post(url, {
            // compensationId: state.compensationId,
            employeeId: state.employeeId,
            employeeName: state.employeeName,
            // amount: state.amount,
            clientName: state.clientName,
            dateReceipt: state.dateReceipt,
            dateHandled: state.dateHandled,
            detail: state.detail,
            partner: state.partner,
            damage: state.damage,
            negligence: state.negligence,
        }).then((r) => {console.log(r);
            setConfirmLoading(false);
            alert("API 보내기 성공")
        });
    }
    return(
        <Modal title="사고 접수처리" visible={props.visible} confirmLoading={confirmLoading} okText={"Submit"} width={850} onCancel={() => props.setVisible(false)} onOk={() => {handleSubmit(); setConfirmLoading(true);}} >
            <table className="ModalTable">
                <thead><tr>
                    <th>세부 항목</th>
                    <th>내용</th>
                </tr></thead>
                <tbody>
                {Object.entries(props.clickedRecord).map(([key, value])=>{
                    return(
                        <tr>
                            <td key={key}>{props.columns.find((d) => d.key===key).title}</td>
                            <td><Form.Item required={true}><Input style={{width: '100%'}} bordered={false} name={key} readOnly={true} value={value} onInput={(val)=>{handleChange({target: {name: '${key}', value: val}})}}/></Form.Item></td>
                        </tr>
                    )
                })}
                <tr>
                    <td>사고 일자</td>
                    <td><Form.Item required={true}><DatePicker style={{width: '100%'}} format={"M/DD/YYYY"} bordered={false} name = "dateReceipt"
                                                               onChange={(val)=>{if(val !== null){handleChange({target: {name: 'dateReceipt', value: val.toLocaleDateString}})}}}/></Form.Item></td>
                </tr>
                <tr>
                    <td>접수 처리일</td>
                    <td><Form.Item required={true}><Input readOnly={true} style={{width: '100%'}} bordered={false} name="dateHandled" value={state.dateHandled} onInput={handleChange}/></Form.Item></td>
                </tr>
                <tr>
                    <td>장소</td>
                    <td><Form.Item required={true}><Input style={{width: '100%'}} bordered={false} placeholder="예시) 서울시 서대문구 거북골로 34"/></Form.Item></td>
                </tr>
                <tr>
                    <td>사고 내용</td>
                    <td><Form.Item required={true}><Input.TextArea style={{width: '100%'}} name="detail" value={state.detail} onChange={handleChange} bordered={false} placeholder="자세한 사고 내용을 입력해주세요"/></Form.Item></td>
                </tr>
                <tr>
                    <td>현장업체 소견</td>
                    <td><Form.Item required={false}><Input style={{width: '100%'}} bordered={false} placeholder="간단한 사고 조치 내용을 입력해주세요"/></Form.Item></td>
                </tr>
                <tr>
                    <td>과실 비율</td>
                    <td><Form.Item required={false}><InputNumber style={{width: '100%'}} defaultValue={50} min={0} max={100} formatter={value => `${value}%`} parser={value => value.replace('%', '')}
                                                               onChange={(val)=>{handleChange({target: {name: 'negligence', value: val}})}} bordered={false} placeholder="접수한 고객의 과실 비율을 입력해주세요"/></Form.Item></td>
                </tr>
                <tr>
                    <td>치료 병원명</td>
                    <td><Form.Item required={false}><Input style={{width: '100%'}} bordered={false} placeholder="치료 병원의 상호명을 입력해주세요"/></Form.Item></td>
                </tr>
                <tr>
                    <td>손해액</td>
                    <td><Form.Item required={true}>
                        <InputNumber bordered={false} placeholder="손해의 가치를 입력해주세요." style={{width: '100%'}}
                        defaultValue={1000000} min={0} formatter={value => `${value}원`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} step={10000}
                                     parser={value => value.replace('원'+/\$\s?|(,*)/g, '')}
                                     onChange={(val)=>{handleChange({target: {name: 'damage', value: val}})}}
                    /></Form.Item></td>
                </tr>
                <tr>
                    <td>사고 현장파견 직원</td>
                    <td><Form.Item required={false}><Input style={{width: '100%'}} name="partner" value={state.partner} onChange={handleChange} bordered={false} placeholder="현장에 파견된 직원의 ID를 입력해주세요"/></Form.Item></td>
                </tr>
                </tbody>
            </table>
        </Modal>
        )
}
export default AccidentModal;