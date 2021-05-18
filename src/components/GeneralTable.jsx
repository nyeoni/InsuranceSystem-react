import 'antd/dist/antd.css';
import React from "react";
import {Table, Space } from 'antd';
const {Column} = Table;

const data = [
    {
        key: '1',
        title : '인수심사 정책 수정 ver1.0',
        author : '관리자',
        date : '2021.04.08'
    },
    {
        key: '2',
        title : '관리 정책 수정 ver1.0',
        author : '관리자',
        date : '2021.04.08'
    },
    {
        key: '3',
        title : '영업관리 정책 수정 ver1.0',
        author : '관리자',
        date : '2021.04.08'
    },
];

export const GeneralTable = () => {
    // TODO : 나중에 Table 데이터 api 불러올 동안 loading true 로 설정하
    return(
        <Table loading={false} dataSource={data} sortDirections="descend">
            <Column title="No" dataIndex="key" key="key" width="10%"/>
            <Column title="제목" dataIndex="title" key="title"/>
            <Column title="작성자" dataIndex="author" key="author" width="10%" fixed={false}/>
            <Column title="작성일" dataIndex="date" key="date" width="10%" fixed={false}/>
        </Table>
    )
}