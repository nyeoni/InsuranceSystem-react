import React from "react";
import {Modal, Button, Container, Row, Col} from "react-bootstrap";

// 보상번호, 보상처리 직원 성명, 보상 금액, 접수 일자, 처리 일자, 사고내역, 협력업체 소견, 손해액, 과실비율)
function Popup(props) {
    return (
        <Modal
            {...props}
            size="lg"
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton><Modal.Title id="contained-modal-title-vcenter">
                {props.title} Detail.
            </Modal.Title></Modal.Header>

            <Modal.Body className="show-grid">
                <Container>
                    <h4>{}</h4>
                    <h4>보상번호 : {props.rowData.compensationID}</h4>
                    {/*todo : 이거 api로 받아오면 map으로 돌리기! 제발...*/}
                    <Row>
                        <Col xs={6} md={4}>보상한 직원 성명</Col>
                        <Col xs={12} md={8}>{props.rowData.employeeName}</Col>
                        <Col xs={6} md={4}>보상 금액</Col>
                        <Col xs={12} md={8}>{props.rowData.amount}</Col>
                        <Col xs={6} md={4}>접수 일자</Col>
                        <Col xs={12} md={8}>{props.rowData.date}</Col>
                        <Col xs={6} md={4}>처리 일자</Col>
                        <Col xs={12} md={8}>{props.rowData.date}</Col>
                        <Col xs={6} md={4}>사고내용</Col>
                        <Col xs={12} md={8}>todo</Col>
                        <Col xs={6} md={4}>협력업체 소견</Col>
                        <Col xs={12} md={8}>todo</Col>
                        <Col xs={6} md={4}>손해액</Col>
                        <Col xs={12} md={8}>todo</Col>
                        <Col xs={6} md={4}>과실 비율</Col>
                        <Col xs={12} md={8}>todo</Col>
                    </Row>
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Send</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default Popup;