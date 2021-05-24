import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable} from "../../components/DataTable";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import Popup from "../../components/Popup";

const Cooperation = () => {
    const title = "협력업체관리";

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'partnerID', headerName: 'Partner ID', flex: 1 },
        { field: 'partnerCategory', headerName: '업체 분류', flex : 0.5 },
        { field: 'partnerName', headerName: '업체명', type: 'number', flex : 0.5,},
        { field: 'contact', headerName: '연락처', description: 'This column has a value getter and is not sortable.', sortable: false, flex : 1,},
    ];
    const rows = [
        { id: 1, partnerID:'3011001',partnerCategory: '사고처리', partnerName: '살려조 사고', contact: '02-0000-0000'},
        { id: 2, partnerID:'3011002', partnerCategory: '병원', partnerName: 'A 병원', contact: '02-0000-0000'},
        { id: 3, partnerID:'3011003',partnerCategory: '병원', partnerName: 'B 병원', contact: '02-0000-0000'},
    ];
    return (
        <Wrapper title = {title}>
            <DropdownButton className="d-inline-block" id="dropdown-basic-button" title="업체 분류" variant = "secondary">
                <Dropdown.Item eventKey="1">병원</Dropdown.Item>
                <Dropdown.Item eventKey="2">사고현장업체</Dropdown.Item>
            </DropdownButton>
            <Button style={{float:'right'}} variant="outline-primary">조회하기</Button>
            <div className="form-group">
                <input type="text" placeholder="검색할 협력업체의 이름을 입력해주세요" className="form-control" id="employeeNameInput"/>
            </div>
            <DataTable rows = {rows} columns = {columns}title = {title}/>
        </Wrapper>
    )
}
export default Cooperation;