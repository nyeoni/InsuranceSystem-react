import React from "react";
import { Wrapper } from "../../components/Wrapper";
import axios from "axios";
import { Badge, Descriptions, Spin, notification } from "antd";
import { useParams } from "react-router-dom";
import useAxios from "../../swr/useAxios";

const SubTitle = ({ text }) => {
  return (
    <h4 style={{ fontSize: "16px", color: "#002967" }}>
      <span>• {text}</span>
    </h4>
  );
};

async function statusInsurance(id, data) {
  console.log("status on api call ", data.status);
  const url = `/insurance/${id}/status`;
  const response = await axios({
    method: "post",
    url: url,
    data: { status: data },
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      notification.open({
        message: "Notification!",
        description: "보험상태 정보 전송 완료",
      });
      window.location.reload();
      return response.data.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
  return response;
}

const SupportDetail = () => {
  const params = useParams();
  const { id } = params;
  const {
    data: insurance,
    isLoading,
    isError,
  } = useAxios(`/insurance/${id}`, "get");

  if (isError) return <div>에러가 발생했습니다</div>;
  if (!insurance || isLoading) {
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

  function onClick() {
    const data = statusInsurance(id, "결재완료");
    console.log("data after api call", data);
  }

  return (
    <Wrapper title={insurance.name} underline={true}>
      <SubTitle text="상품개요" />
      <Descriptions bordered>
        <Descriptions.Item label="상품명" span={2}>
          {insurance.name}
        </Descriptions.Item>
        <Descriptions.Item label="보험분류">
          {insurance.category}
        </Descriptions.Item>
        <Descriptions.Item label="가입최소나이">
          {insurance.conditions?.startAge}세
        </Descriptions.Item>
        <Descriptions.Item label="가입최대나이">
          {insurance.conditions?.endAge}세
        </Descriptions.Item>
        <Descriptions.Item label="최소신용등급">
          {insurance.conditions?.rating}등급
        </Descriptions.Item>
        <Descriptions.Item label="보험상태" span={3}>
          <Badge status="processing" text="상품 운영중" />
        </Descriptions.Item>
        <Descriptions.Item label="보험설명" span={3}>
          {insurance.description}
        </Descriptions.Item>
      </Descriptions>
    </Wrapper>
  );
};

export default SupportDetail;
