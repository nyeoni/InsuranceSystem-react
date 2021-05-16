import React from "react";
import styled from "styled-components";
import {Wrapper} from "../../components/Wrapper";
import '../../css/Detail.css';
import DataTable from "../../components/Table";

const Board = () => {
    return (
        <Wrapper title="공지사항">
            <DataTable />
        </Wrapper>
    )
}

export default Board;