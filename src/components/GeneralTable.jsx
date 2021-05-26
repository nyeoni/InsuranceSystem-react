import 'antd/dist/antd.css';
import React from "react";
import {Table} from 'antd';
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
const {Column} = Table;

const StyledA = styled.a`
    color: black;
    text-decoration: none;
    &:hover {
        color: rgba(0, 0, 0, 0.5);
        text-decoration: none;
    }
`;

export const GeneralTable = ({dataSource, onRow, loading, match}) => {
    return(
        <Table rowKey={(record) => record.id } loading={loading} dataSource={dataSource} sortDirections={["descend"]} onRow={onRow} pagination={{position: ["bottomCenter"]}}>
            <Column title="No" dataIndex="id" key="id" width="10%"/>
            <Column title="내용" key="title" render={(text, record) => {
                return (
                    <StyledA>
                        {record.title}
                    </StyledA>
                )
            }}/>
            <Column title="작성자" dataIndex="author" key="author" width="10%" fixed={false}/>
            <Column title="작성일" dataIndex="date" key="date" width="10%" fixed={false}/>
        </Table>
    )
}