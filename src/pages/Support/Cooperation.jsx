import React from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable} from "../../components/DataTable";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import Popup from "../../components/Popup";

const Cooperation = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const title = "협력업체관리";
    return (
            <Wrapper title = {title} underline = {true}>
                <DropdownButton className="d-inline-block" id="dropdown-basic-button" title="업체 분류" variant = "secondary">
                    <Dropdown.Item eventKey="1">병원</Dropdown.Item>
                    <Dropdown.Item eventKey="2">사고현장업체</Dropdown.Item>

                </DropdownButton>

                {/*onClick 임시로 달아둠, table row 클릭하면 팝업 띄우도록*/}
                <Button style={{float:'right'}} variant="outline-primary"onClick={() => {setModalShow(true)}}>조회하기</Button>
                <div className="form-group">
                    <input type="text" placeholder="검색할 협력업체의 이름을 입력해주세요" className="form-control" id="employeeNameInput"/>
                </div>
                <DataTable withCheckBox = {false}/>

                <Popup
                    title ={title}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Wrapper>
    )
}

export default Cooperation;