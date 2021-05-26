import React from 'react';
import {useState} from "react";
import {Space, Table, Tag} from "antd";

export const DataTable2 = ({columns, dataSource, loading}) => {
    const [popUpShow, setPopUpShow] = useState(false);
    const [rowData, setRowData] = useState([]);

    function showPopUp(rowSelected){
        setPopUpShow(true);
        setRowData(rowSelected);
    }

    return (
        <div style={{marginTop: '1rem'}}>
            <Table rowKey={(record) => record.id } loading={loading} columns={columns} dataSource={dataSource} pagination={{position: ["bottomCenter"]}} bordered />
        </div>
    );
}