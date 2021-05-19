import 'antd/dist/antd.css';
import React from "react";
import {Table, Space } from 'antd';
import styled from "styled-components";
import {Link, Redirect, useHistory} from "react-router-dom";
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



const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
    &:hover {
        color: rgba(0, 0, 0, 0.5);
        text-decoration: none;
    }
`;

export const GeneralTable = () => {
    const history = useHistory();

    const onRow = (record, rowIndex) => {
        return {
            onClick: () => {
                history.replace("/home/board/"+record.key);
            },
        };
    };
    // TODO : 나중에 Table 데이터 api 불러올 동안 loading true 로 설정하
    return(
        <Table loading={false} dataSource={data} sortDirections={"descend"} onRow={onRow}>
            <Column title="No" dataIndex="key" key="key" width="10%"/>
            <Column title="제목" key="title" render={(text, record) => {
                return (
                    <StyledLink to={`/home/board/${record.key}`}>
                        {record.title}
                    </StyledLink>
                )
            }}/>
            <Column title="작성자" dataIndex="author" key="author" width="10%" fixed={false}/>
            <Column title="작성일" dataIndex="date" key="date" width="10%" fixed={false}/>
        </Table>
    )
}