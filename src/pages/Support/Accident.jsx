import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {render} from "react-dom";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import {DataTable} from "../../components/DataTable";
import Popup from "../../components/Popup";

const Accident = () => {
    const title = "사고접수처리";
    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'clientID', headerName: 'Client ID', flex: 1},
        {field: 'clientName', headerName: 'Client Name', flex: 1,},
        {field: 'date', headerName: 'Date', type: 'Date', flex: 1},
        {field: 'status', headerName: 'Status', flex: 0.5,},
    ];
    const rows = [
        {id: 1, clientID: '60100001', clientName: 'Kim go geck', date: '2021.05.19', status: '접수'},
        {id: 2, clientID: '60100002', clientName: 'Kim go geck', date: '2021.05.11', status: '진행'},
        {id: 3, clientID: '60100003', clientName: 'Kim go geck', date: '2021.04.28', status: '완료'},
        {id: 4, clientID: '60100004', clientName: 'Kim go geck', date: '2021.04.20', status: '재심사 요청'},
    ];

    return (
        <Wrapper title={title}>
            <DropdownButton className="d-inline-block" id="dropdown-basic-button" title="조회 기간 설정" variant="secondary">
                <Dropdown.Item href="#/action-4">전체 조회</Dropdown.Item>
            </DropdownButton>
            <Button style={{float: 'right'}} variant="outline-primary">조회하기</Button>
            <DataTable rows={rows} columns={columns}/>

            <DataTable rows={rows} columns={columns} title={title}/>

        </Wrapper>

    )
}

export default Accident;