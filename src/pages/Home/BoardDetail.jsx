import React from "react";
import {Wrapper} from "../../components/Wrapper";
import '../../css/Detail.css';
import {GeneralTable} from "../../components/GeneralTable";

const BoardDetail = ({ match }) => {
    const { id } = match.params;

    console.log(id);
    return (
        <Wrapper title="공지사항" underline={true}>
            <GeneralTable />
        </Wrapper>
    )
}

export default BoardDetail;