import React from "react";
import {Wrapper} from "../../components/Wrapper";
import '../../css/Detail.css';
import useAsync from "../../customHooks/useAsync";
import axios from "axios";
import { Spin } from 'antd';
import {Detail} from "../../components/Detail";

async function getBoard(id) {
    const response = await axios.get(
        `https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/board/${id}`
    );
    return response.data;
}

const BoardDetail = ({ match }) => {
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

export default BoardDetail;