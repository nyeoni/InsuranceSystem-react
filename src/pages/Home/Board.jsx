import React from "react";
import {Wrapper} from "../../components/Wrapper";
import '../../css/Detail.css';
import DataTable from "../../components/DataTable";
import {GeneralTable} from "../../components/GeneralTable";

const Board = () => {
    return (
        <Wrapper title="공지사항" underline={true}>
            <GeneralTable />
        </Wrapper>
    )
}

export default Board;