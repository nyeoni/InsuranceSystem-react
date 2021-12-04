import {Descriptions, Form, Input, Modal} from "antd";
import React from "react";
import {Description} from "@material-ui/icons";

const ClientDetail = (props) =>{
    const {visible, setVisible, clickedRecord} = props;
    const title = clickedRecord.name + ' 님의 세부정보.';

    return(
        <Modal
            title={title} centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}>
            <Descriptions  bordered>
                <Descriptions.Item label="이름">{clickedRecord.name}</Descriptions.Item>
                <Descriptions.Item label="연락처">{clickedRecord.privacy?.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="성별">{clickedRecord.privacy?.gender}</Descriptions.Item>
                <Descriptions.Item label="Email">{clickedRecord.privacy?.email}</Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                    {clickedRecord.privacy?.address}
                </Descriptions.Item>
                <Descriptions.Item label="거래 은행">{clickedRecord.additionalInfo?.bank}은행</Descriptions.Item>
                <Descriptions.Item label="주민번호" span={2}>
                    {clickedRecord.privacy?.rrn.rrnFront} - {clickedRecord.privacy?.rrn.rrnBack}
                </Descriptions.Item>
                <Descriptions.Item label="건물번호" span={3}>
                    {clickedRecord.additionalInfo?.buildingNumber}
                </Descriptions.Item>
                <Descriptions.Item label="여권번호" span={3}>
                    {clickedRecord.additionalInfo?.passportNumber}
                </Descriptions.Item>
                <Descriptions.Item label="운전면허 번호" span={3}>
                    {clickedRecord.additionalInfo?.driverLicenseNumber}
                </Descriptions.Item>
                <Descriptions.Item label="자동차 등록번호" span={3}>
                    {clickedRecord.additionalInfo?.carNumber}
                </Descriptions.Item>
            </Descriptions>
        </Modal>
        )
}
export default ClientDetail;
