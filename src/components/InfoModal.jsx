import React from "react";
import {Modal} from 'antd';
import "../css/Modal.css"

function InfoModal(clickedRecord) {
    return(
        Modal.info({
            title: "세부 내용",
            width: 850,
            content: (
                <table className="ModalTable">
                    <thead><tr>
                        <th>세부 항목</th>
                        <th>내용</th>
                    </tr></thead>
                    <tbody>
                    {Object.entries(clickedRecord).map(([key, value])=>{
                        return(
                            <tr key={key}>
                                <td>{key}</td><td>{value}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            ),
            onOk(){}
        })
    )
}
export default InfoModal;