import React from 'react';
import {useState} from "react";
import {Space, Table, } from "antd";

export const DataTable2 = ({columns, dataSource, loading, onRow}) => {
    return (
        <div style={{marginTop: '1rem'}}>
            <Table onRow={onRow} rowKey={(record) => record.id } loading={loading} columns={columns} dataSource={dataSource} pagination={{position: ["bottomCenter"]}} bordered />
        </div>
    );
}