import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  DatePicker,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Divider,
  Select,
  Modal,
  Spin,
  notification,
} from "antd";
import "../../css/Detail.css";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import { useForm } from "antd/es/form/Form";
import { Wrapper } from "../../components/Wrapper";
import { useParams } from "react-router-dom";
import useAxios from "../../swr/useAxios";

async function getContract(id) {
  const response = await axios.get(`/api/contract/${id}`);
  return response.data.data;
}

//hminsu.net/api/contract/{id}/status
async function contractStatus(id, data) {
  const url = `/contract/${id}`;
  const response = await axios({
    method: "post",
    url: url,
    data: { status: data },
    headers: { "content-type": "application/json" },
  })
    .then(() => {
      notification.open({
        message: "Notification!",
        description: "계약 정보 전송 완료",
      });
      return response.data.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
  console.log(response);
  return response;
}
const UWDetail = (props) => {
  const params = useParams();
  console.log("params", params);
  const { id } = params;
  console.log("id", id);
  const [form] = Form.useForm();
  const [newData, setNewData] = useState({});
  //   const [state] = useAsync(() => getContract(id), setNewData, [id]);
  //   const { loading, data: contract, error } = state;
  const {
    data: contract,
    isLoading,
    isError,
  } = useAxios(`/contract/${id}`, "get");

  if (isError) return <div>에러가 발생했습니다</div>;
  if (!contract || isLoading) {
    return (
      <Wrapper>
        <Spin
          style={{
            textAlign: "center",
            width: "100%",
            height: "100%",
            marginTop: "200px",
          }}
        />
      </Wrapper>
    );
  }
  const handleSubmit = async () => {
    const data = await contractStatus(id, "계약중");
    console.log(data);
  };
  if (newData) {
    // console.log('data status', newData)
    return (
      <Wrapper
        title={"해당 고객의 신청을 인수심사합니다."}
        subtitle={"계약의 status가 인수심사중으로 바뀌게 됩니다."}
        underline={true}
      >
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          size={"large"}
          onFinish={handleSubmit}
        >
          <Form.Item label="Contract ID">
            <Input
              style={{ width: "95%" }}
              readOnly={true}
              value={contract.id}
            />
          </Form.Item>
          <Row>
            <Col span={7}>
              <Form.Item wrapperCol={12} label={"계약 신청인 ID"}>
                <Input
                  style={{ width: "90%" }}
                  readOnly={true}
                  value={contract.clientId}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item wrapperCol={12} label={"계약 신청인 성명"}>
                <Input
                  style={{ width: "90%" }}
                  readOnly={true}
                  value={contract.clientId}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <Form.Item wrapperCol={12} label="주민등록번호 앞자리">
                <InputNumber
                  readOnly={true}
                  style={{
                    display: "inline-block",
                    width: "90%",
                    marginInlineEnd: "4px",
                  }}
                  value={contract.clientId}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item wrapperCol={12} label="주민등록번호 뒷자리">
                <InputNumber
                  readOnly={true}
                  style={{ display: "inline-block", width: "90%" }}
                  value={contract.clientId}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider style={{ fontSize: "1em" }} orientation="left">
            고객계약 내용, 확인시 해당 계약은 심사단계로 이관됩니다.
          </Divider>
          <Row>
            <Col span={7}>
              <Form.Item wrapperCol={12} label={"보험 ID"}>
                <Input
                  readOnly={true}
                  style={{ width: "90%" }}
                  value={contract.insuranceId}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item wrapperCol={12} label={"보험 이름"}>
                <Input
                  readOnly={true}
                  style={{ width: "90%" }}
                  value={contract.insuranceName}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={"보험 종류"}>
            <Input
              readOnly={true}
              style={{ width: "95%" }}
              //   value={state.data.insurance.category}
            />
          </Form.Item>
          <Form.Item label={"보험 내용"}>
            <Input
              readOnly={true}
              style={{ width: "95%" }}
              //   value={state.data.insurance.description}
            />
          </Form.Item>
          <Form.Item label={"계약 상태"}>
            <Input
              readOnly={true}
              style={{ width: "95%" }}
              //   value={state.data.status}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginBottom: "10px" }}
              type="primary"
              htmlType="submit"
              value="Submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    );
  }
};
export default UWDetail;
