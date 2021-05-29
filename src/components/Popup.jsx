import React from "react";
import {Modal} from 'antd';
import "../css/Popup.css"

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
                            <td key={key}>{key}</td><td>{value}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Modal>
    );
}
export default Popup;