import React from "react";
import { Modal, Button } from 'antd';
import "../css/Popup.css"
// 보상번호, 보상처리 직원 성명, 보상 금액, 접수 일자, 처리 일자, 사고내역, 협력업체 소견, 손해액, 과실비율)


function Popup(props) {
    return (
        <Modal title="세부 내용" visible={props.visible} onOk={() => props.setVisible(false)} width={1000}>
            <table className="popupTable">
                <thead><tr>
                    <th>세부 항목</th>
                    <th>내용</th>
                </tr></thead>
                <tbody>
                {Object.entries(props.clickedRecord).map(([key, value])=>{
                    return(
                        <tr>
                            <td>{key}</td><td>{value}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Modal>
    );
}
export default Popup;