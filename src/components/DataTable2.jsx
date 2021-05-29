import React from 'react';
import {useState} from "react";
import {Space, Table, } from "antd";
import Popup from "./Popup";


export const DataTable2 = ({columns, dataSource, loading}) => {
    const [visible, setVisible] = React.useState(false);
    const [clickedRecord, setClickedRecord] = React.useState([]);
    const onRow = (record, rowIndex) => {
        return {onClick: (record) => {
            setClickedRecord(dataSource[rowIndex])
            setVisible(true);
            },
        };
    }
    return (
        <div style={{marginTop: '1rem'}}>
            <Table onRow={onRow} rowKey={(record) => record.id } loading={loading} columns={columns} dataSource={dataSource} pagination={{position: ["bottomCenter"]}} bordered />
            <Popup clickedRecord = {clickedRecord} visible = {visible} setVisible = {setVisible}/>
        </div>
    );
}