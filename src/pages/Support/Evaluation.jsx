import React from "react";

import {Wrapper} from "../../components/Wrapper";
import {Dropdown, DropdownButton, Button} from "react-bootstrap";
import {DataTable} from "../../components/DataTable";
import "../../css/Detail.css";
    // valueGetter: (params) =>
    //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,

const Evaluation = () => {
    const title = "보상평가관리";

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'employeeID', headerName: 'Employee ID', flex : 1},
        { field: 'employeeName', headerName: 'Employee Name', flex : 1 },
        { field: 'amount', headerName: 'Amount', type: 'number', flex : 0.5,},
        { field: 'clientName', headerName: 'Client Name', sortable: false, flex : 1,},
        { field: 'date', headerName: 'Date',type: 'Date', flex : 1},
    ];
    const rows = [
        { id: 1, employeeID: '60100001', employeeName: 'Jaime Lann', amount: '3,500,000', clientName: 'Kim go geck', date : '2021.04.28' },
        { id: 2, employeeID: '60100002', employeeName: 'Park Empl', amount: '500,000,000', clientName: 'Kim go geck', date : '2021.04.28' },
        { id: 3, employeeID: '60100003', employeeName: 'Lee Employee', amount: '10,000,0000', clientName: 'Kim go geck', date : '2021.04.28' },
    ];

    return (
            <Wrapper title={title}>
                    <DropdownButton className="d-inline-block" id="dropdown-basic-button" title="조회 기간 설정" variant = "secondary">
                        <Dropdown.Item href="#/action-1">1개월</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">3개월</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">1년</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4">전체 조회</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton className="d-inline-block" id="dropdown-basic-button" title="보험 선택" variant = "secondary">
                        <Dropdown.Item eventKey="1">보험번호 : 보험이름</Dropdown.Item>
                        <Dropdown.Item eventKey="2">보험번호 : 보험이름</Dropdown.Item>
                        <Dropdown.Item eventKey="3">보험번호 : 보험이름</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">전체 조회</Dropdown.Item>
                    </DropdownButton>

                <Button style={{float:'right'}} variant="outline-primary" >조회하기</Button>
                <div className="form-group">
                    <input type="text" placeholder="검색할 직원의 성명을 입력해주세요" className="form-control" id="employeeNameInput"/>
                </div>

                <DataTable rows = {rows} columns = {columns}/>
            </Wrapper>

    )
}

export default Evaluation;