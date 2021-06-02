
import React from "react";
import {Modal} from "antd"
import "../../css/Modal.css"
import axios from "axios";
import useAsync from "../../customHooks/useAsync";

const ClaimDetail = (props) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            props.setVisible(false);
            setConfirmLoading(false);
        }, 1000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        props.setVisible(false);
    };
    return (
        <Modal title = "해당 Claim에 대한 보상을 심사합니다" width={800} visible = {props.visible} confirmLoading={confirmLoading} onOk={handleOk} onCancel={handleCancel}>
            <table className="ModalTable">
                <thead><tr>
                    <th>세부 항목</th>
                    <th>내용</th>
                </tr></thead>
                <tbody>
                <tr>
                    <td>Claim ID</td><td>{props.clickedRecord.id}</td>
                </tr>
                <tr>
                    <td>Contract ID</td><td>{props.clickedRecord.contractId}</td>
                </tr>
                <tr>
                    <td>상세 내용</td><td>{props.clickedRecord.claimDetail}</td>
                </tr>
                <tr>
                    <td>과실 비율</td><td>{props.clickedRecord.claimRate}%</td>
                </tr>
                <tr>
                    <td>손해액</td><td>{props.clickedRecord.damageCost}</td>
                </tr>
                <div style={{align:'center'}}>확인시 접수상태를 자동으로 '보상심사중'으로 변경합니다.</div>
                </tbody>
            </table>
        </Modal>
    )
}
export default ClaimDetail;