import React from "react";
import {Wrapper} from "../../components/Wrapper";
import {GeneralTable} from "../../components/GeneralTable";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Spin} from "antd";
import {Detail} from "../../components/Detail";

//todo: board.jsx에 url만 갈아 끼워놓도록 해도 될 듯??
async function getBoard(id) {
    const response = await axios.get(
        `/api/board/${id}`
    );
    return response.data;
}
const UWPolicyDetail = ({match, history}) => {
    const { id } = match.params;
    const [state] = useAsync(() => getBoard(id), null,[id]);
    const { loading, data: board, error } = state;

    if (error) return <div>에러가 발생했습니다</div>;
    if (!board || loading) {
        return(
            <Wrapper>
                <Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Detail board={board}/>
        </Wrapper>
    )
}
export default UWPolicyDetail;