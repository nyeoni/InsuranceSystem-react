import React from 'react';
import {DropdownButton, Dropdown} from "react-bootstrap";
import PropTypes from 'prop-types';

export const MyDropdown = (props) => {
    return(
        props.title.map((t)=>{
            return(
                <DropdownButton className="d-inline-block" id="dropdown-basic-button" title={t} variant = "secondary">
                    <Dropdown.Item eventKey="1">보험번호 : 보험이름</Dropdown.Item>
                    <Dropdown.Item eventKey="2">보험번호 : 보험이름</Dropdown.Item>
                    <Dropdown.Item eventKey="3">보험번호 : 보험이름</Dropdown.Item>
                    <Dropdown.Item eventKey="3">todo: 보험번호 이름 받아서 자동으로 만들기</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">전체 조회</Dropdown.Item>
                </DropdownButton>
                )
        })
    )
}
MyDropdown.propTypes = {//필요없을듯?
    title : PropTypes.arrayOf(PropTypes.string)
}