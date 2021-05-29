import React, {useState} from "react";
import {Modal} from "antd"

const AccidentModal = (props) => {
    return(
        <Modal title="사고 접수처리" visible={props.visible} okText={"Submit"} onOk={() => props.setVisible(false)} width={850}>
            <table className="ModalTable">
                <thead><tr>
                    <th>세부 항목</th>
                    <th>내용</th>
                </tr></thead>
                <tbody>
                {Object.entries(props.clickedRecord).map(([key, value])=>{
                    return(
                        <tr>
                            <td key={key}>{key}</td><td>{value}</td>
                        </tr>
                    )
                })}
                <tr><td><input/></td></tr>
                </tbody>
            </table>
        </Modal>
        )
}
export default AccidentModal;