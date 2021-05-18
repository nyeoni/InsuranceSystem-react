import React from "react";

import {Wrapper} from "../../components/Wrapper";
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import {DataTable} from "../../components/DataTable";
import "../../css/Detail.css";

const Evaluation = () => {
    return (
            <Wrapper title="보상평가관리" underline={true}>
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


                <DataTable />
            </Wrapper>

    )
}

export default Evaluation;