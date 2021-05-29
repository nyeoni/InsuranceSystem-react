import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";

const Accident = () => {
    const title = "사고접수처리";
    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'clientID', headerName: 'Client ID', flex: 1},
        {field: 'clientName', headerName: 'Client Name', flex: 1,},
        {field: 'date', headerName: 'Date', type: 'Date', flex: 1},
        {field: 'status', headerName: 'Status', flex: 0.5,},
    ];
    return (
        <Wrapper title={title}>
            {/*<DropdownButton className="d-inline-block" id="dropdown-basic-button" title="조회 기간 설정" variant="secondary">*/}
            {/*    <Dropdown.Item href="#/action-4">전체 조회</Dropdown.Item>*/}
            {/*</DropdownButton>*/}
        </Wrapper>

    )
}

export default Accident;