import React from "react";
import {Wrapper} from "../../components/Wrapper";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";


const Underwriting = () => {
    const title = "인수심사"
    return (
        <Wrapper title = {title}>
            <DropdownButton className="d-inline-block" id="dropdown-basic-button" title="보험 선택" variant = "secondary">
                <Dropdown.Item eventKey="1">보험번호 : 임시 자동차 보험</Dropdown.Item>
                <Dropdown.Item eventKey="2">보험번호 : 운전자 보험</Dropdown.Item>
                <Dropdown.Item eventKey="3">보험번호 : 여행자 보험</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">전체 조회</Dropdown.Item>
            </DropdownButton>

            <DropdownButton className="d-inline-block" id="dropdown-basic-button" title="심사 상태 선택" variant = "secondary">
                <Dropdown.Item eventKey="1">심사 승인</Dropdown.Item>
                <Dropdown.Item eventKey="2">심사 진행 중</Dropdown.Item>
                <Dropdown.Item eventKey="3">심사 거부</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">전체 조회</Dropdown.Item>
            </DropdownButton>

            <Button style={{float:'right'}} variant="outline-primary" >조회하기</Button>
            <div className="form-group">
                <input type="text" placeholder="검색할 고객의 성명을 입력해주세요" className="form-control" id="employeeNameInput"/>
            </div>
        
        </Wrapper>
    )
}

export default Underwriting;