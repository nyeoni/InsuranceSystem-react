import React from "react";
import {Wrapper} from "../../components/Wrapper";
import {Button, Dropdown, DropdownButton, Form, Col} from "react-bootstrap";
import {DataTable} from "../../components/DataTable";

const Compensate = () => {
    const title = "보상처리";
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'clientId', headerName: 'Client ID', flex : 1},
        { field: 'clientName', headerName: 'Client Name', flex : 1 },
        { field: 'insuranceName', headerName: 'Insurance Name', flex : 1 },
        { field: 'contact', headerName: 'Contact', flex : 1},
        { field: 'statement', headerName: 'Statement', flex : 1},
        { field: 'status', headerName: 'Status', flex : 0.5,},
    ];
    const rows = [
        { id: 1, clientId: '1131401', clientName: 'Kim go geck', insuranceName:'살려조 자동차 보험', contact: '010-0000-0000', statement: '주행 중 부주의 차량 고장', status : '재심사 요청'},
        { id: 2, clientId: '1119801', clientName: 'Kim son nim', insuranceName:'살려조 자동차 보험', contact: '010-0000-0000', statement: '주행 중 부주의 차량 고장', status : '재심사 요청'},
    ];
    return (
        <Wrapper title = {title}>

            <DropdownButton className="d-inline-block" id="dropdown-basic-button" title="보험 선택" variant = "secondary">
                <Dropdown.Item eventKey="1">보험번호 : 보험이름</Dropdown.Item>
                <Dropdown.Item eventKey="2">보험번호 : 보험이름</Dropdown.Item>
                <Dropdown.Item eventKey="3">보험번호 : 보험이름</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">전체 조회</Dropdown.Item>
            </DropdownButton>

            <Button style={{float:'right'}} variant="outline-primary">조회하기</Button>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="검색할 고객의 성명을 입력해주세요" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="검색할 고객의 고객번호를 입력해주세요" />
                    </Col>
                </Form.Row>
            </Form>

            <DataTable rows = {rows} columns = {columns}/>
                </Wrapper>
    )
}

export default Compensate;